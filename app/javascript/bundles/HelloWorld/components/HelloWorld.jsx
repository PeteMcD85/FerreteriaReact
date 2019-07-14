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
      selectedNavList : [],
      selectedNavListInactives: [],
      signedIn: this.props.signedIn,
      picUrls: this.props.picUrls,
      cart: {
        cartItems: [],
        cartTotal: {
          subtotal: 0,
          taxes: 0,
          total: 0
        }
      },
      showCart: false
   };
   this.updateSelectedNavList("All");
  }

  updateSelectedNavList = (navName) => {
    fetch("/items.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            selectedNavName: navName,
            selectedNavList: result.actives[navName],
            selectedNavListInactives: result.inactives[navName]
          });
        },
        (error) => {
          console.error("Error retrieving results for updateSelectedNavList AJAX method");
          console.error(error);
        }
      )
  }

  calculateCartTotal = (cartItems) => {
    let subtotal = cartItems.reduce((total, cartItem)=> {
          return total += +cartItem.subtotal
        }, 0).toFixed(2),
        taxes = (subtotal * .115).toFixed(2),
        total = (+subtotal + +taxes).toFixed(2);
    return {subtotal: subtotal, taxes: taxes, total: total}
  }

  updateCartItem = (id, columnName, columnValue) => {
    let cart = this.state.cart,
        cartItems = cart.cartItems,
        itemIndex = cartItems.findIndex((cartItem)=> cartItem.item.id == id),
        cartItem = cartItems[itemIndex];
    cartItem[columnName] = columnValue;
    cartItem['subtotal'] = (cartItem.priceGiven * cartItem.quantity).toFixed(2);
    cartItems[itemIndex] = cartItem;
    this.setState({
      cart: {
        cartItems: cartItems,
        cartTotal: this.calculateCartTotal(cartItems)
      }
    });
  }

  addToCart = (id, quantity) => {
    let cartItems = this.state.cart.cartItems,
        item = this.state.activeItems.find((item)=> item.id == id);
    cartItems.push({item: item, quantity: quantity, priceGiven: item.price, subtotal: (+quantity * +item.price).toFixed(2) });
    this.setState({
      cart: {
        cartItems: cartItems,
        cartTotal: this.calculateCartTotal(cartItems)
      }
    });
  }

  removeFromCart = (id) => {
    let cartItems = this.state.cart.cartItems,
        itemToRemove = cart.findIndex((cartItem)=> cartItem.item.id == id );
        cartItems.splice(itemToRemove,1);
    this.setState({
      cart: {
        cartItems: cartItems,
        cartTotal: calculateCartTotal(cartItems)
      }
    });
    this.setState({ cart: cart });
  }

  clearCart = () => {
    this.setState({
      cart: {
        cartItems: [],
        cartTotal: {
          subtotal: 0,
          taxes: 0,
          total: 0
        }
      }
   })
  }

  orderCart = () => {
    let csrfToken = document.querySelector("[name='csrf-token']").content,
        cart = this.state.cart;
    fetch(
      "/orders", {
        method: "POST",
        body: JSON.stringify({
          order: {
            orderType: 'sale',
            itemOrders: cart
          }
        }),
        headers: {
          "X-CSRF-Token": csrfToken,
          "Content-Type": "application/json"
        }
      }).then(response => {
        console.log('response');
        console.log(response);
        if (!response.ok) { throw response; }
        return response.url;
      }).then((url) => {
        window.location.replace(url);
      }).catch(error => {
        console.error("error", error);
      });
  }

    cartButton = () => {
      let showCart = (this.state.showCart) ? false : true;
      this.setState({ showCart: showCart })
    }

  dropdown = (e) => {
    e.persist();
    let target = e.target.innerHTML,
        columnName = (target === "Categories") ? "category-list" : "brand-list",
        columnList = document.getElementsByClassName(columnName)[0];
        columnList.classList.toggle('hidden');
        console.log(e);
  };
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
             { showCart &&
               <Cart
                 cart={cart}
                 removeFromCart={this.removeFromCart}
                 updateCartItem={this.updateCartItem}
                 orderCart={this.orderCart}
               /> }
           </div>
         }
         { !showCart &&
           <div>
             <div className="category-brand">
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
                   cart={cart}
                 />
               </div>
             }
             </div>
           </div>
         }
       </div>
    );
  }
}
