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
      cart: []
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
          console.error("Error retrieving results for updateSelectedNavList AJAX method");
          console.error(error);
        }
      )
  }

  addToCart = (id, quantity) => {
    let cart = this.state.cart;
        cart.push({itemId: id, quantity: quantity});
    this.setState({ cart: cart });
  }

  removeFromCart = (id) => {
    let cart = this.state.cart,
        itemToRemove = cart.findIndex((item)=> item.itemId == id );
        cart.splice(itemToRemove,1);
    this.setState({ cart: cart });
  }

  render() {
    let brands = this.state.brands,
        categories = this.state.categories,
        selectedNavName = this.state.selectedNavName,
        selectedNavList = this.state.selectedNavList,
        selectedNavListInactives = this.state.selectedNavListInactives,
        signedIn = this.state.signedIn,
        picUrls = this.state.picUrls;
        console.log(this.state);
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
          addToCart ={this.addToCart}
          removeFromCart={this.removeFromCart}
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
