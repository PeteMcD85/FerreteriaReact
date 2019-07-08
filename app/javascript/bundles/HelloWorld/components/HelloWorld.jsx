import PropTypes from 'prop-types'
import React from 'react'

// COMPONENTS
import Items from './Items'
import NavList from './NavList'
import Cart from './Cart'

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
   * @param props
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
      cart: [],
      showCart: false
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
    let cart = this.state.cart,
        item = this.state.activeItems.find((item)=> item.id == id)
        cart.push({item: item, quantity: quantity});
    this.setState({ cart: cart });
  }

  removeFromCart = (id) => {
    let cart = this.state.cart,
        itemToRemove = cart.findIndex((cartItem)=> cartItem.item.id == id );
        cart.splice(itemToRemove,1);
    this.setState({ cart: cart });
  }

  clearCart = () => {
    this.setState({ cart: [] })
  }

  orderCart = () => {
    let csrfToken = document.querySelector("[name='csrf-token']").content,
        cart = this.state.cart;
    fetch(
      "/orders", {
        method: "POST",
        body: JSON.stringify({
          order: {
            order_type: 'sale',
            item_orders: cart
          }
        }),
        headers: {
          "X-CSRF-Token": csrfToken,
          "Content-Type": "application/json"
        }
      }).then(response => {
        if (!response.ok) { throw response; }
        return response.json();
      }).then((data) => {
        console.log(data);
      }).catch(error => {
        console.error("error", error);
      });
  }

    cartButton = () => {
      let showCart = (this.state.showCart) ? false : true;
      this.setState({ showCart: showCart })
    }

  render() {
    let brands = this.state.brands,
        categories = this.state.categories,
        selectedNavName = this.state.selectedNavName,
        selectedNavList = this.state.selectedNavList,
        selectedNavListInactives = this.state.selectedNavListInactives,
        signedIn = this.state.signedIn,
        picUrls = this.state.picUrls,
        cart = this.state.cart,
        showCart = this.state.showCart;
        console.log(this.state);
    return (
      <div className="hello-world">
        { signedIn &&
           <div>
             <div>
               <button id="cart-button" onClick={this.cartButton}>
                 {(showCart) ? "Add More Items" : "Check Out"}
               </button>
               <button id="clear-cart-button" onClick={this.clearCart}>
                 Clear Cart
               </button>
             </div>
             { showCart && <Cart cart={cart}  /> }
           </div>
         }
         { !showCart &&
           <div>
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
               cart={cart}
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
         }

      </div>
    );
  }
}
