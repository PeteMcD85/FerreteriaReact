import React, { useState, useEffect, useRef } from "react";
import CartItems from "./CartItems";
import FormInputs from "./FormInputs";
function CartMain(props) {
  let { setKey } = props,
    // OrderName and OrderPhone input values
    [custoInfo, setCustoInfo] = useState({}),
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
    [validationErrors, setValidationErrors] = useState([]),
    // Changes to "Printing..." when user clicks print button
    [printButtonText, setPrintButtonText] = useState("Imprima el Recibo"),
    orderIdDiv = useRef(null);
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
      <div id="order-id" ref={orderIdDiv}></div>
      {validationErrors.map(err => (
        <p key={err} className="error-validation">
          {err}
        </p>
      ))}

      <FormInputs
        id="name-phone"
        inputsArray={[
          { text: "Nombre", value: "orderName" },
          { text: "Telefono", value: "orderPhone" }
        ]}
        inputOptions={textInputOptions}
      />

      <FormInputs
        id="taxes"
        inputsArray={[{ text: "Libre De Impuestos", value: "" }]}
        inputOptions={{
          type: "checkbox",
          onChange: setTaxFree
        }}
      />
      <FormInputs
        id="payment-options"
        inputsArray={paymentOptions}
        inputOptions={radioInputOptions}
      />
      {paymentMethod === "cashPayed" && (
        <FormInputs
          id="cash-payment"
          inputsArray={cashMethod}
          inputOptions={numberInputOptions}
        />
      )}
      {paymentMethod === "custom" && (
        <FormInputs
          id="custom-payment"
          inputsArray={customMethod}
          inputOptions={numberInputOptions}
        />
      )}
      {displayCustomerChange()}
      <CartItems
        {...{ printButtonText, taxFree, orderCart, cartTotal, setCartTotal }}
      />
    </div>
  );

  function displayCustomerChange() {
    // Returns Customer Change Value IF payment method is custom or cash
    if (cartTotal.total > 0 && paymentRecieved) {
      let custoChange = +cartTotal.total - paymentRecieved,
        change = custoChange.toFixed(2),
        pretext = +change > 0 ? "Falta" : "Cambio de Cliente";
      console.log(change);
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

    const payPayedTotal = Object.keys(payPayed).reduce((total, key) => {
      return +payPayed[key] + total;
    }, 0);
    console.log(payPayedTotal);
    if (payPayedTotal > cartTotal.total)
      payPayed.cashPayed -= payPayedTotal - cartTotal.total;
    return payPayed;
  }

  function orderCart(cartItems) {
    setPrintButtonText(" Printing... ");
    let activeSavedCart = document.getElementsByClassName("active")[0],
      order = {
        orderType: "sale",
        itemOrders: { cartItems, cartTotal },
        taxFree,
        ...custoInfo,
        ...orderPayed()
      },
      errors = validateOrder(cartItems);
    setValidationErrors(errors);
    console.log(order);
    if (errors.length > 0) return setPrintButtonText("Imprima el Recibo");
    createOrder(order);
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
      console.log(cartItems);
      if (!cartItems || cartItems.length === 0)
        return "No hay articulos en el carrito";
    }
  } // end of validateOrder()

  function createOrder(order) {
    let csrfToken = document.querySelector("[name='csrf-token']").content;
    fetch("/orders", {
      method: "POST",
      body: JSON.stringify({
        order: {
          ...order
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
          orderErrors = res.order_errors;
        orderIdDiv.current.innerText = `Order Number : ${orderId}`;
        window.print();
        // setPrintButtonText("Imprima el Recibo");
        // console.log("res");
        // console.log(res);
        if (orderErrors.length > 0) {
          return alert(
            "Todo los articulos no fui en el Orden, save un copy de reciept y llama Stephen. Por Favor Reload Page"
          );
        }
        window.location.href = "/";
        setKey();
      })
      .catch(error => {
        console.error("error", error);
      });
  }
} // End of component

export default CartMain;
