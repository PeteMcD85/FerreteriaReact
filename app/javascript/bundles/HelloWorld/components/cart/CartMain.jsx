import React, { useState, useEffect } from "react";
import CartItems from "./CartItems";
import FormInputs from "./FormInputs";
function CartMain() {
  // OrderName and OrderPhone input values
  let [custoInfo, setCustoInfo] = useState({}),
    // Determines if order will be Tax exempted
    [taxFree, setTaxFree] = useState(false),
    //Object that stores the order's {subtotal, taxes, total}
    [cartTotal, setCartTotal] = useState({}),
    // One of [cashPayed,debitPayed, custom, etc...]
    [paymentMethod, setPaymentMethod] = useState(null),
    // for custom or cash {cashPayed, debitPayed, etc...}
    [paymentPayed, setPaymentPayed] = useState(null),
    // Amount given by the customer
    [paymentRecieved, setPaymentRecieved] = useState(null),
    // Amount of customer's change
    [customerChange, setCustomerChange] = useState(null),
    // A list of form validation errors
    [validationErrors, setValidationErrors] = useState([]);
  const paymentOptions = [
      { text: "Efectivo", value: "cashPayed" },
      { text: "Tarjeta De Crédito", value: "creditCardPayed" },
      { text: "Cheque", value: "checkPayed" },
      { text: "Débito", value: "debitPayed" },
      { text: "Custom", value: "custom" }
    ],
    customMethod = paymentOptions.slice(0, paymentOptions.length - 1),
    cashMethod = paymentOptions.slice(0, 1),
    radioInputOptions = {
      type: "radio",
      name: "paymentMethod",
      onChange: setPaymentMethod
    },
    numberInputOptions = {
      type: "number",
      className: "payment-input",
      onChange: setPaymentPayed
    },
    textInputOptions = {
      type: "text",
      className: "custo-info",
      onChange: setCustoInfo
    };

  useEffect(() => {
    console.log(paymentMethod);
    paymentMethod === "cashPayed" || paymentMethod === "custom"
      ? setPaymentRecieved(0)
      : setPaymentPayed(null);
  }, [paymentMethod]);

  useEffect(() => {
    if (paymentPayed) {
      setPaymentRecieved(
        Object.values(paymentPayed).reduce((t, n) => {
          return t + +n;
        }, 0)
      );
    } else {
      setPaymentRecieved(null);
    }
  }, [paymentPayed]);

  return (
    <div>
      <div id="order-id"></div>
      {validationErrors.map(err => (
        <p key={err} className="error-validation">
          {err}
        </p>
      ))}
      <FormInputs
        inputsArray={[
          { text: "Nombre", value: "orderName" },
          { text: "Telefono", value: "orderPhone" }
        ]}
        inputOptions={textInputOptions}
      />

      <FormInputs
        inputsArray={[{ text: "Libre De Impuestos", value: "" }]}
        inputOptions={{
          type: "checkbox",
          onChange: setTaxFree
        }}
      />
      <FormInputs
        inputsArray={paymentOptions}
        inputOptions={radioInputOptions}
      />
      {paymentMethod === "cashPayed" && (
        <FormInputs
          inputsArray={cashMethod}
          inputOptions={numberInputOptions}
        />
      )}
      {paymentMethod === "custom" && (
        <FormInputs
          inputsArray={customMethod}
          inputOptions={numberInputOptions}
        />
      )}
      {displayCustomerChange()}
      <CartItems {...{ taxFree, orderCart, cartTotal, setCartTotal }} />
    </div>
  );

  function displayCustomerChange() {
    // Returns Customer Change Value IF payment method is custom or cash
    if (cartTotal.total > 0 && paymentRecieved) {
      let change = (+cartTotal.total - paymentRecieved).toFixed(2),
        pretext = +change > 0 ? "Falta" : "Cambio de Cliente";
      if (cartTotal.total > 0 && paymentRecieved)
        return (
          <p>
            {pretext} : ${Math.abs(change)}
          </p>
        );
    }
  }

  function orderPayed() {
    let payPayed;
    if (paymentPayed) {
      payPayed = paymentPayed;
    } else {
      payPayed = {
        cashPayed: 0,
        creditCardPayed: 0,
        checkPayed: 0,
        debitPayed: 0
      };
      payPayed[paymentMethod] = cartTotal.total;
    }
    return payPayed;
  }

  function orderCart(cartItems) {
    let csrfToken = document.querySelector("[name='csrf-token']").content,
      activeSavedCart = document.getElementsByClassName("active")[0],
      order = {
        orderType: "sale",
        itemOrders: { cartItems, cartTotal },
        taxFree,
        ...custoInfo,
        ...orderPayed()
      };
    console.log(order);
    let errors = validateOrder();
    console.log(errors);
    if (errors.length > 0) return setValidationErrors(errors);

    // order;
  }

  function validateOrder(cartItems) {
    let err = [],
      validations = [
        checkForCartName,
        checkForPaymentMethod,
        checkForPaymentRecieved,
        checkForCartItems
      ];
    validations.forEach(func => {
      if (func()) err.push(func());
    });
    return err;

    function checkForCartName() {
      console.log(custoInfo);
      if (!custoInfo.orderName || custoInfo.orderName.trim() === "")
        return "Proporcione un nombre";
    }

    function checkForPaymentMethod() {
      if (!paymentMethod) return "Debe elegir el método de pago";
    }

    function checkForPaymentRecieved() {
      if (paymentRecieved && paymentRecieved < cartTotal.total)
        return `${paymentRecieved}:Debe ser mayor que ${cartTotal.total}`;
    }

    function checkForCartItems() {
      if (!cartItems || cartItems.length === 0)
        return "No hay articulos en el carrito";
    }
  } // end of validateOrder()

  function createOrder(order) {
    // fetch("/orders", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     order: {
    //       orderType: "sale",
    //       itemOrders: cart,
    //       taxFree: taxFree,
    //       cashPayed: customMethod.cash,
    //       creditCardPayed: customMethod.creditCard,
    //       debitPayed: customMethod.debit,
    //       checkPayed: customMethod.check,
    //       orderName: orderName,
    //       orderPhone: orderPhone
    //     }
    //   }),
    //   headers: {
    //     "X-CSRF-Token": csrfToken,
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(response => {
    //     console.log("response");
    //     console.log(response);
    //     if (!response.ok) {
    //       throw response;
    //     }
    //     return response.json();
    //   })
    //   .then(res => {
    //     let orderId = res.order_id,
    //       orderIdDiv = document.getElementById("order-id"),
    //       orderErrors = res.order_errors;
    //     orderIdDiv.innerText = `Order Number : ${orderId}`;
    //     window.print();
    //     printButton.disabled = false;
    //     printButton.innerHTML = "Imprima el Recibo";
    //     // location.reload();
    //     console.log("res");
    //     console.log(res);
    //     if (orderErrors.length > 0)
    //       return
    //         "Todo los articulos no fui en el Orden, save un copy de reciept y llama Stephen. Por Favor Reload Page"
    //       );
    //     location.reload(true);
    //   })
    //   .catch(error => {
    //     console.error("error", error);
    //   });
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

// <label>
//   <input
//     id="order-name"
//     className="custo-info"
//     placeholder="Nombre"
//   />
// </label>
// <label>
//   <input
//     id="order-phone"
//     className="custo-info"
//     placeholder="Telefono"
//   />
// </label>

export default CartMain;
