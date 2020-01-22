import React, { useState, useEffect } from "react";
import CartItems from "./CartItems";
import FormInputs from "./FormInputs";
function CartMain() {
  let [custoInfo, setCustoInfo] = useState({}),
    [taxFree, setTaxFree] = useState(false),
    [cartTotal, setCartTotal] = useState(0),
    [paymentMethod, setPaymentMethod] = useState(null),
    [paymentRecieved, setPaymentRecieved] = useState(null),
    [customerChange, setCustomerChange] = useState(null);
  const paymentOptions = [
      { text: "Efectivo", value: "cashGiven" },
      { text: "Tarjeta De Crédito", value: "creditCardGiven" },
      { text: "Cheque", value: "checkGiven" },
      { text: "Débito", value: "debitGiven" },
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
      onChange: setPaymentRecieved
    },
    textInputOptions = {
      type: "text",
      className: "custo-info",
      onChange: setCustoInfo
    };

  useEffect(() => {
    paymentMethod === "cashGiven" || paymentMethod === "custom"
      ? setPaymentRecieved(0)
      : setPaymentRecieved(null);
  }, [paymentMethod]);

  useEffect(() => {
    console.log(custoInfo);
    console.log(taxFree);
  }, [custoInfo, taxFree]);

  return (
    <div>
      <div>
        <div id="order-id"></div>
        <FormInputs
          inputsArray={[
            { text: "Nombre", value: "" },
            { text: "Telefono", value: "" }
          ]}
          inputOptions={textInputOptions}
        />
      </div>
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
      {paymentMethod === "cashGiven" && (
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
    if (cartTotal > 0 && paymentRecieved) {
      let change = (+cartTotal - paymentRecieved).toFixed(2),
        pretext = +change > 0 ? "Falta" : "Cambio de Cliente";
      if (cartTotal > 0 && paymentRecieved)
        return (
          <p>
            {pretext} : ${Math.abs(change)}
          </p>
        );
    }
  }

  function orderCart() {
    let csrfToken = document.querySelector("[name='csrf-token']").content,
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
  }

  // function updateCustomInputChange() {
  //   let cashAmount = document.getElementById("custom-cash").value,
  //     creditCardAmount = document.getElementById("custom-credit-card").value,
  //     checkAmount = document.getElementById("custom-check").value,
  //     debitAmount = document.getElementById("custom-debit").value,
  //     cartTotal = this.state.cart.cartTotal.total,
  //     customTotal = (
  //       +cashAmount +
  //       +creditCardAmount +
  //       +checkAmount +
  //       +debitAmount
  //     ).toFixed(2),
  //     customerChange = (+customTotal - +cartTotal).toFixed(2);
  //
  //   this.setState({
  //     customTotal: customTotal,
  //     customerChange: customerChange
  //   });
  // }

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
