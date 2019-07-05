import PropTypes from 'prop-types'
import React from 'react'

// COMPONENTS
import Items from './Items'
import NavList from './NavList'

export default class HelloWorld extends React.Component {
  static propTypes = {
    activeItems: PropTypes.array.isRequired,
    inactiveItems: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    brands: PropTypes.array.isRequired,
    signedIn: PropTypes.bool.isRequired,
    picUrls: PropTypes.array.isRequired
  };

  /**
   * @param props - Comes from your rails view.
   */

  constructor(props) {
    super(props);
    this.state = {
      activeItems: this.props.activeItems,
      inactiveItems: this.props.inactiveItems,
      brands: this.props.brands,
      categories: this.props.categories,
      selectedNavName: "All",
      selectedNavList : this.props.activeItems,
      selectedNavListInactives: this.props.inactiveItems,
      signedIn: this.props.signedIn,
      picUrls: this.props.picUrls
   };
   console.log(this.state);
  }

  updateSelectedNavList = (navName) => {
    fetch("/items.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            selectedNavName: navName,
            selectedNavList: result.actives[navName]
          });
        },
        (error) => {
          console.error(error);
        }
      )
  }
  dropdown = (e) => {
    e.persist();
    let target = e.target.innerHTML,
        columnName = (target === "Categories") ? "category-list" : "brand-list",
        columnList = document.getElementsByClassName(columnName)[0];
        columnList.classList.toggle('hidden');
        console.log(e);
        // if (columnList.classList.contains('hidden')) {
        //   columnList.remove('hidden');
        // } else {
        //   columnList.add('hidden')
        // }
        // columnList.setAttribute("style", "display: inherit")
    // columnList = (columnName === "category") ? categories : brands;
    // return (
    //   <div className="nav-list-mobile">
    //     <NavList
    //        columnList={columnList}
    //        columnName={columnName}
    //        updateSelectedNavList={this.updateSelectedNavList}
    //     />
    //   </div>
    // )
  };
  render() {
    let inactiveItems = this.state.inactiveItems,
        activeItems = this.state.activeItems,
        brands = this.state.brands,
        categories = this.state.categories,
        selectedNavName = this.state.selectedNavName,
        selectedNavList = this.state.selectedNavList,
        selectedNavListInactives = this.state.selectedNavListInactives,
        signedIn = this.state.signedIn,
        picUrls = this.state.picUrls;

        console.log(this.state);
    return (
      <div className="hello-world">
        <div className="category-brand-user">
          <p onClick={(e) => this.dropdown(e)}>Categories</p>
          <p onClick={(e) => this.dropdown(e)}>Brands</p>
        </div>
        <div id="nav-list">
          <NavList
             columnList={brands}
             columnName="brand"
             updateSelectedNavList={this.updateSelectedNavList}
          />
          <NavList
             columnList={categories}
             columnName="category"
             updateSelectedNavList={this.updateSelectedNavList}
          />
        </div>


        <Items
          items={selectedNavList}
          selectedNavName={selectedNavName}
          signedIn={signedIn}
          picUrls={picUrls}
        />
        {signedIn &&
          <div>
            <h2>Inactive Items</h2>
            <Items
              items={selectedNavListInactives}
              selectedNavName={selectedNavName}
              signedIn={signedIn}
              picUrls={picUrls}
            />
          </div>
        }
      </div>
    );
  }
}
