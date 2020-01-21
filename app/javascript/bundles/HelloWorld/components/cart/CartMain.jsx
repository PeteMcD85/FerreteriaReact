import React, { useState, useEffect } from "react";
import CartItems from "./CartItems";
import FormInputs from "./FormInputs";
function CartMain() {
  let [taxFree, setTaxFree] = useState(false),
    [paymentMethod, setPaymentMethod] = useState(null),
    [paymentRecieved, setPaymentRecieved] = useState(0);
  const paymentOptions = [
      { text: "Efectivo", value: "cashGiven" },
      { text: "Tarjeta De Crédito", value: "creditCardGiven" },
      { text: "Cheque", value: "checkGiven" },
      { text: "Débito", value: "debitGiven" },
      { text: "Custom", value: "custom" }
    ],
    paymentOptionsNum = [
      { text: "Efectivo", value: 0 },
      { text: "Tarjeta De Crédito", value: 0 },
      { text: "Cheque", value: 0 },
      { text: "Débito", value: 0 }
    ],
    radioInputOptions = {
      type: "radio",
      name: "paymentMethod",
      onChange: setPaymentMethod
    },
    numberInputOptions = {
      type: "number",
      className: "payment-input",
      onChange: setPaymentRecieved
    };
  useEffect(() => {
    console.log(taxFree);
    console.log(paymentMethod);
    console.log(paymentRecieved);
  }, [taxFree, paymentRecieved]);

  useEffect(() => {
    setPaymentRecieved(0);
  }, [paymentMethod]);

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
      <label>
        Libre De Impuestos
        <input
          type="checkbox"
          id="tax-free"
          onChange={e => setTaxFree(e.target.checked)}
        />
      </label>
      <FormInputs
        {...{
          inputsArray: paymentOptions,
          inputOptions: radioInputOptions
        }}
      />
      {paymentMethod === "cashGiven" && (
        <FormInputs
          {...{
            inputsArray: paymentOptionsNum.slice(0, 1),
            inputOptions: numberInputOptions
          }}
        />
      )}
      {paymentMethod === "custom" && (
        <FormInputs
          {...{
            inputsArray: paymentOptionsNum,
            inputOptions: numberInputOptions
          }}
        />
      )}
      <CartItems {...{ taxFree }} />
    </div>
  );

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
