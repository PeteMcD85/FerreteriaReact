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
      picUrls: this.props.picUrls,
      itemsForOrder: []
   };
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

  render() {
    let brands = this.state.brands,
        categories = this.state.categories,
        selectedNavName = this.state.selectedNavName,
        selectedNavList = this.state.selectedNavList,
        selectedNavListInactives = this.state.selectedNavListInactives,
        signedIn = this.state.signedIn,
        picUrls = this.state.picUrls;
    return (
      <div className="hello-world">
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
