import React, { useState, useRef } from "react";
import CartItems from "./CartItems";
import CartPaymentMethods from "./CartPaymentMethods";
function CartMain() {
  return (
    <div>
      <div>
        <div id="order-id"></div>
        <div id="order-name-div">
          <label>
            <input
              id="order-name"
              className="custo-info"
              placeholder="Nombre"
            />
          </label>
          <label>
            <input
              id="order-phone"
              className="custo-info"
              placeholder="Telefono"
            />
          </label>
        </div>
      </div>
      <CartItems />
    </div>
  );

  //

  function updatePaymentMethod(e) {
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
  }

  function updateCashRecieved(e) {
    let cartTotal = this.state.cart.cartTotal.total,
      val = e.target.value,
      customerChange = (+val - +cartTotal).toFixed(2);

    this.setState({ customerChange: customerChange });
  }

  function updateCustomInputChange() {
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
  }

  function clearCart() {
    // For SAVEDCARTS
    this.removeAllActiveClass();

    setCartItems([]);
  }

  function saveCart() {
    let savedCarts = this.state.savedCarts,
      cart = this.state.cart;
    savedCarts.push(cart);
    LS.set("savedCarts", savedCarts);
    this.clearCart();
    window.location.href = "/";
  }

  function displaySavedCart(e, savedCartIndex) {
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
  }

  function removeAllActiveClass() {
    let savedCartButtons = document.getElementsByClassName("saved-cart-button");
    for (let i = 0; i < savedCartButtons.length; i += 1) {
      savedCartButtons[i].classList.remove("active");
    }
  }

  function removeSavedCart(savedCartIndex) {
    let savedCarts = this.state.savedCarts;
    savedCarts.splice(savedCartIndex, 1);
    LS.set("savedCarts", savedCarts);
    this.setState({ savedCarts: savedCarts });
  }
} // End of component

export default CartMain;
