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
      selectedNavName: "Todo",
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
      showCart: false,
      taxFree: false,
      paymentMethod: '',
      query: '',
      queryListActiveItems: this.props.activeItems,
      showQueryList: false,
      queryLength: 0,
      customerChange:0,
      customTotal: 0
   };
   this.updateSelectedNavList("Todo");
  }

  updateSelectedNavList = (navName) => {
    fetch("/items.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            selectedNavName: navName,
            selectedNavList: result.actives[navName],
            selectedNavListInactives: result.inactives[navName],
            showQueryList: false
          });
        },
        (error) => {
          console.error("Error retrieving results for updateSelectedNavList AJAX method");
          console.error(error);
        }
      )
  }

  calculateCartTotal = (cartItems, taxFree=false) => {
    let subtotal = cartItems.reduce((total, cartItem)=> {
          return total += +cartItem.subtotal
        }, 0).toFixed(2),
        taxes = taxFree ? 0 : (subtotal * .115).toFixed(2),
        total = (+subtotal + +taxes).toFixed(2);
    return {subtotal: subtotal, taxes: taxes, total: total}
  }

  updateCartItem = (id, columnName, columnValue) => {
    let cart = this.state.cart,
        taxFree = this.state.taxFree,
        cartItems = cart.cartItems,
        itemIndex = cartItems.findIndex((cartItem)=> cartItem.item.id == id),
        cartItem = cartItems[itemIndex];
    cartItem[columnName] = columnValue;
    cartItem['subtotal'] = (cartItem.priceGiven * cartItem.quantity).toFixed(2);
    cartItems[itemIndex] = cartItem;
    this.setState({
      cart: {
        cartItems: cartItems,
        cartTotal: this.calculateCartTotal(cartItems, taxFree)
      }
    });
  }

  addToCart = (id, quantity) => {
    let cartItems = this.state.cart.cartItems,
        taxFree = this.state.taxFree,
        item = this.state.activeItems.find((item)=> item.id == id);
    cartItems.push({item: item, quantity: quantity, priceGiven: item.sold_price, subtotal: (+quantity * +item.sold_price).toFixed(2) });
    this.setState({
      cart: {
        cartItems: cartItems,
        cartTotal: this.calculateCartTotal(cartItems, taxFree)
      }
    });
  }

  removeFromCart = (id) => {
    let cartItems = this.state.cart.cartItems,
        taxFree = this.state.taxFree,
        itemToRemove = cartItems.findIndex((cartItem)=> cartItem.item.id == id );
        cartItems.splice(itemToRemove,1);
    this.setState({
      cart: {
        cartItems: cartItems,
        cartTotal: this.calculateCartTotal(cartItems, taxFree)
      }
    });
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
        cart = this.state.cart,
        cartTotal = cart.cartTotal.total,
        taxFree = this.state.taxFree,
        paymentMethod = this.state.paymentMethod,
        customMethod = {
          cash:0,
          creditCard:0,
          check:0,
          debit:0
        };
    if(paymentMethod === '') return alert('Debe elegir el método de pago')
    if (paymentMethod === 'custom') {
      let cashAmount = +document.getElementById('custom-cash').value,
          creditCardAmount = +document.getElementById('custom-credit-card').value,
          checkAmount = +document.getElementById('custom-check').value,
          debitAmount = +document.getElementById('custom-debit').value,
          customTotal = (cashAmount + creditCardAmount + checkAmount + debitAmount).toFixed(2);
      if(cartTotal < customTotal) {
        return alert(`${customTotal}:Debe ser mayor que ${cartTotal}`)
      } else {
        customMethod.cash = cashAmount;
        customMethod.creditCard = creditCardAmount;
        customMethod.check = checkAmount;
        customMethod.debit = debitAmount;
      }
    } else {
      if (paymentMethod === 'cash') {
        let customerChange = this.state.customerChange;
        if (customerChange < 0) return alert('Efectivo Recibido debe ser mayor que 0')
      }
      customMethod[paymentMethod] = cartTotal
    }
    fetch(
      "/orders", {
        method: "POST",
        body: JSON.stringify({
          order: {
            orderType: 'sale',
            itemOrders: cart,
            taxFree: taxFree,
            cashPayed: customMethod.cash,
            creditCardPayed: customMethod.creditCard,
            debitPayed: customMethod.debit,
            checkPayed: customMethod.check
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
        return response.json();
      }).then((res) => {
        let orderId = res.order_id,
            orderIdDiv = document.getElementById('order-id');
        orderIdDiv.innerText = `Order Number : ${orderId}`;
        window.print();

        console.log(res);
        // window.location.replace(url);
      }).catch(error => {
        console.error("error", error);
      });
  }

  cartButton = () => {
    let showCart = (this.state.showCart) ? false : true;
    this.setState({ showCart: showCart })
  }

  dropdown = (e) => {
    let target = e.target.innerHTML,
        columnName = (target === "Categories") ? "category-list" : "brand-list",
        columnList = document.getElementsByClassName(columnName)[0];
        columnList.classList.toggle('hidden');
  }

  updateTaxFree = () => {
    let taxFree = this.state.taxFree ? false : true,
        cart = this.state.cart;
    if (taxFree) {
      cart.cartTotal.taxes = 0;
      cart.cartTotal.total = cart.cartTotal.subtotal;
    } else {
      let cartTotal = this.calculateCartTotal(cart.cartItems, taxFree);
      console.log(cartTotal);
      cart.cartTotal.taxes = cartTotal.taxes;
      cart.cartTotal.total = cartTotal.total;
    }

    this.setState({
      taxFree: taxFree,
      cart: cart
    });
  }


  updatePaymentMethod = (e) => {
    let val =e.target.value,
        customPayment = document.getElementById('custom-payment-method'),
        cashPayment = document.getElementById('cash-payment-method');
    console.log(val);
    if (val === 'custom') {
      customPayment.classList.remove('hidden');
      cashPayment.classList.add('hidden')
    } else if (val === 'cash') {
      customPayment.classList.add('hidden');
      cashPayment.classList.remove('hidden');
    } else {
      customPayment.classList.add('hidden');
      cashPayment.classList.add('hidden')
    }
    this.setState({paymentMethod: val})
  }

  handleOnInputChange = (event) => {
    event.persist();
    const query = event.target.value;
    this.getQueriedItems(query)
  }

  getQueriedItems = (query) => {
    query = query.trim();
    let currentQueryLength = query.length,
        prevQueryLength = this.state.queryLength;
    if(currentQueryLength === 0) {
      this.setState({
        showQueryList: false ,
        queryListActiveItems: this.state.activeItems,
        query: "",
        queryLength: currentQueryLength,
        selectedNavName: "Todo"
      });
    } else {
        let words = query.split(" "),
            stateActiveItems = this.state.activeItems,
            stateQueryListActiveItems = this.state.queryListActiveItems,
            queryListActiveItems = (currentQueryLength < prevQueryLength) ? stateActiveItems :  stateQueryListActiveItems,
            queriedItems = queryListActiveItems.filter((activeItem) => {
              let name = activeItem.name.toLowerCase(),
                  category = activeItem.category ? activeItem.category.toLowerCase() : "",
                  brand = activeItem.brand ? activeItem.brand.toLowerCase() : "",
                  size = activeItem.size ? activeItem. size.toLowerCase() : "",
                  color = activeItem.color ? activeItem.color.toLowerCase() : "",
                  stockNumber = activeItem.stock_number ? activeItem.stock_number.toLowerCase() : "",
                  thickness = activeItem.thickness ? activeItem.thickness.toLowerCase() : "",
                  returnItem = false;
              words.forEach((word, ind) => {
                if (ind > 0 && !returnItem) return
                word = word.toLowerCase();
                returnItem = (name.includes(word) || category.includes(word) || brand.includes(word) || size.includes(word) || color.includes(word) || thickness.includes(word) || stockNumber.includes(word)) ? true : false;
              })
              if (returnItem) return activeItem
            });//end of getQueriedItems
            console.log('queriedItems');
            console.log(queriedItems);
        this.setState({
          query: query,
          queryListActiveItems: queriedItems,
          showQueryList: true,
          queryLength: currentQueryLength,
          selectedNavName: "query"
        })
      }//end of if else

  }


  updateCashRecieved = (e) => {
    let cartTotal = this.state.cart.cartTotal.total,
        val = e.target.value,
        customerChange = (+val - +cartTotal ).toFixed(2);
        console.log(val);
        console.log(cartTotal);
    this.setState({customerChange: customerChange})
  }

  updateCustomInputChange = () => {
    let cashAmount = +document.getElementById('custom-cash').value,
        creditCardAmount = +document.getElementById('custom-credit-card').value,
        checkAmount = +document.getElementById('custom-check').value,
        debitAmount = +document.getElementById('custom-debit').value,
        cartTotal = this.state.cart.cartTotal.total,
        customTotal = (cashAmount + creditCardAmount + checkAmount + debitAmount).toFixed(2),
        customerChange = (customTotal - cartTotal).toFixed(2);
    this.setState({
      customTotal: customTotal,
      customerChange: customerChange
    });
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
        showCart = this.state.showCart,
        taxFree = this.state.taxFree,
        showQueryList = this.state.showQueryList,
        queryListActiveItems = this.state.queryListActiveItems,
        cartTotal = cart.cartTotal.total,
        customerChange = this.state.customerChange,
        customTotal = this.state.customTotal;
    console.log(this.state);
    return (
      <div className="hello-world">
        { signedIn &&
           <div>
             <div>
               <div className="cart-buttons">
                 <button id="cart-button" onClick={this.cartButton}>
                   {(showCart) ? "Añadir más Artículos" : "Check Out"}
                 </button>
                 <button id="clear-cart-button" onClick={this.clearCart}>
                   Vaciar Carrito
                 </button>
               </div>
             </div>
             { showCart &&
               <div>
                 <div id="order-id"></div>
                 <div className="payment-methods">
                   <label>Tax Free
                     <input type='checkbox' id="tax-free" onChange={this.updateTaxFree}/>
                   </label>
                   <label>Cash
                     <input type='radio' name="paymentMethod" value="cash" onChange={this.updatePaymentMethod}/>
                   </label>
                   <label>Credit Card
                     <input type='radio' name="paymentMethod" value="creditCard" onChange={this.updatePaymentMethod}/>
                   </label>
                   <label>Check
                     <input type='radio' name="paymentMethod" value="check" onChange={this.updatePaymentMethod}/>
                   </label>
                   <label>Debit
                     <input type='radio' name="paymentMethod" value="debit" onChange={this.updatePaymentMethod}/>
                   </label>
                   <span>
                     <label>Custom
                       <input type='radio' name="paymentMethod"  value="custom" onChange={this.updatePaymentMethod}/>
                     </label>
                     <div id="custom-payment-method" className="hidden">
                       <label>Cash
                         <input type='number' id="custom-cash" onChange={this.updateCustomInputChange} />
                       </label>
                       <label>Credit Card
                         <input type='number' id="custom-credit-card" onChange={this.updateCustomInputChange} />
                       </label>
                       <label>Check
                         <input type='number' id="custom-check" onChange={this.updateCustomInputChange} />
                       </label>
                       <label>Debit
                         <input type='number' id="custom-debit" onChange={this.updateCustomInputChange} />
                       </label>
                       <div id="custom-change" >
                        {`${(customerChange< 0) ? 'Falta' : 'Cambio de Cliente' } : ${Math.abs(customerChange)}`}
                       </div>
                      </div>
                       <div id="cash-payment-method" className="hidden">
                       <label>Efectivo Recibido
                         <input type='number' id="cash-recieved" onChange={this.updateCashRecieved}/>
                       </label>
                       <span> ${cartTotal} = ${customerChange}</span>
                    </div>
                   </span>
                 </div>
                 <Cart
                   cart={cart}
                   removeFromCart={this.removeFromCart}
                   updateCartItem={this.updateCartItem}
                   orderCart={this.orderCart}
                 />
               </div>
 }
           </div>
         }
         { !showCart &&
           <div>
             { !signedIn &&
                 <div className="phone-map">
                 <button> <i className="fa fa-phone-square"></i> </button>
                 <button> <i className="fa fa-map-pin"></i> </button>
                </div>
              }

              <div className="search">
                <input type="text" placeholder=" ..Search" onChange={this.handleOnInputChange} />
                <button> <i className="fa fa-search" onClick={this.getQueriedItems}></i> </button>
              </div>
             <div className="category-brand">
               <p onClick={(e) => this.dropdown(e)}>Categories</p>
               <p onClick={(e) => this.dropdown(e)}>Brands</p>
             </div>
             <div id="nav-list">
               <div className="dropdown">
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
               {showQueryList &&
                <div>
                  <Items
                    items={queryListActiveItems}
                    selectedNavName="query"
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
               }
              {!showQueryList &&
                <div>
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
             }
             </div>
           </div>
         }
       </div>
    );
  }
}
