import PropTypes from "prop-types";
import React from "react";
import LS from "local-storage";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// COMPONENTS
import Accountant from "./accountant/Accountant";
import Cart from "./cart/Cart";
import CartPaymentMethods from "./cart/CartPaymentMethods";
import Items from "./items/Items";
// import NavList from "./NavList";

export default class HelloWorld extends React.Component {
  static propTypes = {
    activeItems: PropTypes.array.isRequired,
    inactiveItems: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    brands: PropTypes.array.isRequired,
    signedIn: PropTypes.bool.isRequired
    // picUrls: PropTypes.array.isRequired
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
      selectedNavList: [],
      selectedNavListInactives: [],
      signedIn: this.props.signedIn,
      // picUrls: this.props.picUrls,
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
      paymentMethod: "",
      query: "",
      queryListActiveItems: this.props.activeItems,
      showQueryList: false,
      queryLength: 0,
      customerChange: 0,
      customTotal: 0,
      customItemId: 9999,
      itemsStartRange: 0,
      itemsEndRange: 10,
      showAccountant: false,
      savedCarts: []
    };
  }

  componentDidMount() {
    let savedCarts = LS.get("savedCarts");
    if (!savedCarts) LS.set("savedCarts", []);
    this.setState({ savedCarts: savedCarts });
  }

  calculateCartTotal = cartItems => {
    let taxFree = this.state.taxFree,
      subtotal = cartItems
        .reduce((total, cartItem) => {
          return (total += +cartItem.subtotal);
        }, 0)
        .toFixed(2),
      taxes = (subtotal * 0.115).toFixed(2),
      total = (+subtotal + +taxes).toFixed(2);

    return { subtotal: subtotal, taxes: taxes, total: total };
  };

  updateCartItem = (id, columnName, columnValue) => {
    let cart = this.state.cart,
      taxFree = this.state.taxFree,
      cartItems = cart.cartItems,
      itemIndex = cartItems.findIndex(cartItem => cartItem.item.id == id),
      cartItem = cartItems[itemIndex];
    cartItem[columnName] = columnValue;
    cartItem["subtotal"] = (cartItem.priceGiven * cartItem.quantity).toFixed(2);
    cartItems[itemIndex] = cartItem;
    this.setState({
      cart: {
        cartItems: cartItems,
        cartTotal: this.calculateCartTotal(cartItems)
      }
    });
  };

  addToCart = (id, quantity) => {
    let cartItems = this.state.cart.cartItems,
      taxFree = this.state.taxFree,
      item = this.state.activeItems.find(item => item.id == id);
    cartItems.push({
      item: item,
      quantity: quantity,
      priceGiven: item.sold_price,
      subtotal: (+quantity * +item.sold_price).toFixed(2)
    });
    this.setState({
      cart: {
        cartItems: cartItems,
        cartTotal: this.calculateCartTotal(cartItems)
      }
    });
  };

  addCustomItemToCart = customItemValues => {
    let cartItems = this.state.cart.cartItems,
      taxFree = this.state.taxFree,
      item = customItemValues,
      customItemId = this.state.customItemId;
    item.id = customItemId + 1;
    item.brand = "Custom Item";
    cartItems.push({
      item: item,
      quantity: customItemValues.quantity,
      priceGiven: customItemValues.priceGiven,
      subtotal: customItemValues.subtotal
    });
    this.setState({
      cart: {
        cartItems: cartItems,
        cartTotal: this.calculateCartTotal(cartItems)
      },
      customItemId: item.id
    });
  };

  removeFromCart = id => {
    let cartItems = this.state.cart.cartItems,
      taxFree = this.state.taxFree,
      doc = document.getElementById(`item-price-${id}`),
      itemToRemove = cartItems.findIndex(cartItem => cartItem.item.id == id);
    cartItems.splice(itemToRemove, 1);

    this.setState({
      cart: {
        cartItems: cartItems,
        cartTotal: this.calculateCartTotal(cartItems)
      }
    });
  };

  clearCart = () => {
    this.removeAllActiveClass();
    this.setState({
      cart: {
        cartItems: [],
        cartTotal: {
          subtotal: 0,
          taxes: 0,
          total: 0
        }
      }
    });
  };

  orderCart = () => {
    let csrfToken = document.querySelector("[name='csrf-token']").content,
      cart = this.state.cart,
      cartTotal = cart.cartTotal.total,
      taxFree = this.state.taxFree,
      paymentMethod = this.state.paymentMethod,
      orderPhone = document.getElementById("order-phone").value,
      orderName = document.getElementById("order-name").value,
      printButton = document.getElementById("print-button"),
      activeSavedCart = document.getElementsByClassName("active")[0],
      customMethod = {
        cash: 0,
        creditCard: 0,
        check: 0,
        debit: 0
      };
    if (!orderName || orderName.trim() === "")
      return alert("Proporcione un nombre");
    if (paymentMethod === "") return alert("Debe elegir el método de pago");
    if (paymentMethod === "custom") {
      let cashAmount = +document.getElementById("custom-cash").value,
        creditCardAmount = +document.getElementById("custom-credit-card").value,
        checkAmount = +document.getElementById("custom-check").value,
        debitAmount = +document.getElementById("custom-debit").value,
        customTotal = (
          cashAmount +
          creditCardAmount +
          checkAmount +
          debitAmount
        ).toFixed(2);
      if (+cartTotal > +customTotal) {
        return alert(`${customTotal}:Debe ser mayor que ${cartTotal}`);
      } else {
        if (customTotal > cartTotal) {
          let difference = customTotal - cartTotal;
          cashAmount -= difference;
          if (cashAmount < 0) return alert("Please Review");
        }
        customMethod.cash = cashAmount;
        customMethod.creditCard = creditCardAmount;
        customMethod.check = checkAmount;
        customMethod.debit = debitAmount;
      }
    } else {
      if (paymentMethod === "cash") {
        let customerChange = this.state.customerChange,
          cashRecieved = document.getElementById("cash-recieved").value;
        if (+customerChange < 0 || +cashRecieved < +cartTotal)
          return alert(`Efectivo Recibido debe ser mayor que ${cartTotal}`);
      }
      customMethod[paymentMethod] = cartTotal;
    }
    printButton.disabled = true;
    printButton.innerHTML = "Printing";
    if (activeSavedCart) {
      let savedCartIndex = +activeSavedCart.innerHTML - 1;
      this.removeSavedCart(savedCartIndex);
    }
    fetch("/orders", {
      method: "POST",
      body: JSON.stringify({
        order: {
          orderType: "sale",
          itemOrders: cart,
          taxFree: taxFree,
          cashPayed: customMethod.cash,
          creditCardPayed: customMethod.creditCard,
          debitPayed: customMethod.debit,
          checkPayed: customMethod.check,
          orderName: orderName,
          orderPhone: orderPhone
        }
      }),
      headers: {
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log("response");
        console.log(response);
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then(res => {
        let orderId = res.order_id,
          orderIdDiv = document.getElementById("order-id"),
          orderErrors = res.order_errors;
        orderIdDiv.innerText = `Order Number : ${orderId}`;
        window.print();
        printButton.disabled = false;
        printButton.innerHTML = "Imprima el Recibo";
        // location.reload();
        console.log("res");
        console.log(res);
        if (orderErrors.length > 0)
          return alert(
            "Todo los articulos no fui en el Orden, save un copy de reciept y llama Stephen. Por Favor Reload Page"
          );
        location.reload(true);
      })
      .catch(error => {
        console.error("error", error);
      });
  };

  cartButton = () => {
    let showCart = this.state.showCart ? false : true;
    this.setState({ showCart: showCart });
  };

  dropdown = e => {
    let target = e.target.innerHTML,
      columnName = target === "Categories" ? "category-list" : "brand-list",
      columnList = document.getElementsByClassName(columnName)[0];
    columnList.classList.toggle("hidden");
  };

  updateTaxFree = () => {
    let taxFree = this.state.taxFree ? false : true,
      cart = this.state.cart,
      cartTotal = this.state.cart.cartTotal.total;

    document.getElementById("custom-cash").value;
    document.getElementById("custom-credit-card").value;
    document.getElementById("custom-check").value;
    document.getElementById("custom-debit").value;
    document.getElementById("cash-recieved").value;
    if (taxFree) {
      cart.cartTotal.taxes = 0;
      cart.cartTotal.total = cart.cartTotal.subtotal;
    } else {
      let cartTotal = this.calculateCartTotal(cart.cartItems);
      cart.cartTotal.taxes = cartTotal.taxes;
      cart.cartTotal.total = cartTotal.total;
    }
    this.setState({
      taxFree: taxFree,
      cart: cart,
      customTotal: 0,
      customerChange: 0
    });
  };

  updatePaymentMethod = e => {
    let val = e.target.value,
      customPayment = document.getElementById("custom-payment-method-div"),
      cashPayment = document.getElementById("cash-payment-method");
    document.getElementById("custom-cash").value = 0;
    document.getElementById("custom-credit-card").value = 0;
    document.getElementById("custom-check").value = 0;
    document.getElementById("custom-debit").value = 0;
    document.getElementById("cash-recieved").value = 0;
    if (val === "custom") {
      customPayment.classList.remove("hidden");
      cashPayment.classList.add("hidden");
    } else if (val === "cash") {
      customPayment.classList.add("hidden");
      cashPayment.classList.remove("hidden");
    } else {
      customPayment.classList.add("hidden");
      cashPayment.classList.add("hidden");
    }
    this.setState({
      paymentMethod: val,
      customTotal: 0,
      customerChange: 0
    });
  };

  updateCashRecieved = e => {
    let cartTotal = this.state.cart.cartTotal.total,
      val = e.target.value,
      customerChange = (+val - +cartTotal).toFixed(2);

    this.setState({ customerChange: customerChange });
  };

  updateCustomInputChange = () => {
    let cashAmount = document.getElementById("custom-cash").value,
      creditCardAmount = document.getElementById("custom-credit-card").value,
      checkAmount = document.getElementById("custom-check").value,
      debitAmount = document.getElementById("custom-debit").value,
      cartTotal = this.state.cart.cartTotal.total,
      customTotal = (
        +cashAmount +
        +creditCardAmount +
        +checkAmount +
        +debitAmount
      ).toFixed(2),
      customerChange = (+customTotal - +cartTotal).toFixed(2);

    this.setState({
      customTotal: customTotal,
      customerChange: customerChange
    });
  };

  getCategoryBrand = (column, columnName) => {
    fetch(`/get_category_brand.json?column=${column}&columnName=${columnName}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            selectedNavName: columnName,
            selectedNavList: result.actives,
            selectedNavListInactives: result.inactives,
            showQueryList: false,
            itemsStartRange: 0,
            itemsEndRange: 10
          });
        },
        error => {
          console.error(
            "Error retrieving results for updateSelectedNavList AJAX method"
          );
          console.error(error);
        }
      );
  };

  updateItemsRange = direction => {
    let itemsStartRange = this.state.itemsStartRange,
      itemsEndRange = this.state.itemsEndRange,
      max = this.state.selectedNavList.length;
    if (direction === "more") {
      itemsStartRange += 10;
      itemsEndRange += 10;
    } else {
      itemsStartRange -= 10;
      itemsEndRange -= 10;
    }
    this.setState({
      itemsStartRange: itemsStartRange,
      itemsEndRange: itemsEndRange
    });
  };

  updateShowAccountant = e => {
    let isChecked = e.target.checked;
    this.setState({ showAccountant: isChecked });
  };

  updateItems = (activeItems, inactiveItems) => {
    this.setState({
      activeItems: activeItems,
      inactiveItems: inactiveItems
    });
  };

  saveCart = () => {
    let savedCarts = this.state.savedCarts,
      cart = this.state.cart;
    savedCarts.push(cart);
    LS.set("savedCarts", savedCarts);
    this.clearCart();
    window.location.href = "/";
  };

  displaySavedCart = (e, savedCartIndex) => {
    let savedCarts = this.state.savedCarts,
      savedCart = savedCarts[savedCartIndex],
      savedCartButton = e.target,
      savedCartTotal = this.calculateCartTotal(savedCart.cartItems);
    this.removeAllActiveClass();
    savedCartButton.classList.add("active");
    this.setState({
      cart: {
        cartItems: savedCart.cartItems,
        cartTotal: savedCartTotal
      }
    });
    this.cartButton();
  };

  removeAllActiveClass = () => {
    let savedCartButtons = document.getElementsByClassName("saved-cart-button");
    for (let i = 0; i < savedCartButtons.length; i += 1) {
      savedCartButtons[i].classList.remove("active");
    }
  };

  removeSavedCart = savedCartIndex => {
    let savedCarts = this.state.savedCarts;
    savedCarts.splice(savedCartIndex, 1);
    LS.set("savedCarts", savedCarts);
    this.setState({ savedCarts: savedCarts });
  };

  render() {
    let activeItems = this.state.activeItems,
      inactiveItems = this.state.inactiveItems,
      brands = this.state.brands,
      categories = this.state.categories,
      selectedNavName = this.state.selectedNavName,
      selectedNavList = this.state.selectedNavList,
      selectedNavListInactives = this.state.selectedNavListInactives,
      signedIn = this.state.signedIn,
      // picUrls = this.state.picUrls,
      cart = this.state.cart,
      showCart = this.state.showCart,
      taxFree = this.state.taxFree,
      showQueryList = this.state.showQueryList,
      queryListActiveItems = this.state.queryListActiveItems,
      cartTotal = cart.cartTotal.total,
      customerChange = this.state.customerChange,
      customTotal = this.state.customTotal,
      itemsStartRange = this.state.itemsStartRange,
      itemsEndRange = this.state.itemsEndRange,
      showAccountant = this.state.showAccountant,
      savedCarts = this.state.savedCarts;
    // console.log(this.state);
    return (
      <div className="hello-world">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/inventario">Inventario</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
           renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/inventario">
                <Accountant
                  activeItems={activeItems}
                  updateItems={this.updateItems}
                  inactiveItems={inactiveItems}
                />
              </Route>
              <Route path="/cart">
                <div>
                  <div id="order-id"></div>
                  <div id="order-name-div">
                    <label>
                      <input id="order-name" placeholder="Nombre" />
                    </label>
                    <label>
                      <input id="order-phone" placeholder="Telefono" />
                    </label>
                  </div>
                  <CartPaymentMethods
                    updateTaxFree={this.updateTaxFree}
                    updatePaymentMethod={this.updatePaymentMethod}
                    updateCustomInputChange={this.updateCustomInputChange}
                    updateCashRecieved={this.updateCashRecieved}
                    customerChange={customerChange}
                  />
                  <Cart
                    cart={cart}
                    removeFromCart={this.removeFromCart}
                    updateCartItem={this.updateCartItem}
                    orderCart={this.orderCart}
                    addCustomItemToCart={this.addCustomItemToCart}
                  />
                </div>
              </Route>
              <Route path="/">
                <Items
                  activeItems={activeItems}
                  inactiveItems={inactiveItems}
                  signedIn={signedIn}
                  // items={queryListActiveItems}
                  // selectedNavName="query"
                  // signedIn={signedIn}
                  // // picUrls={picUrls}
                  // addToCart={this.addToCart}
                  // removeFromCart={this.removeFromCart}
                  // cart={cart}
                  // itemsStartRange={itemsStartRange}
                  // itemsEndRange={itemsEndRange}
                  // updateItemsRange={this.updateItemsRange}
                />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
