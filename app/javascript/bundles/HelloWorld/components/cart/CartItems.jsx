import React, { useState, useEffect, useRef, useContext } from "react";

import CartContext from "../contexts/CartContext";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import CustomItemForm from "./CustomItemForm";

function CartItems(props) {
  let [taxFree, setTaxFree] = useState(false),
    [cartSubtotal, setCartSubtotal] = useState(0),
    [cartTaxes, setCartTaxes] = useState(0),
    [cartTotal, setCartTotal] = useState(0),
    { cartItems } = useContext(CartContext);

  useEffect(() => {
    calcCartTotal();
    console.log(cartItems);
  }, [taxFree, cartItems]);

  // let test = cart.cartTotal.taxes;
  function orderCart() {
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
  }

  return (
    <div id="cart">
      <table>
        <tbody>
          <tr>
            <th>Marca</th>
            <th>Nombre</th>
            <th>Color</th>
            <th>Tamaño</th>
            <th>Grosor</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total Parcial</th>
            <th className="hide-for-print">Borrar</th>
          </tr>
          {cartItems.map((cartItem, ind) => {
            return <CartItem key={cartItem.item.id} cartItem={cartItem} />;
          })}
          <CustomItemForm />
          <CartTotal name="Subtotal" value={cartSubtotal} />
          <CartTotal name="Taxes" value={cartTaxes} />
          <CartTotal name="Total" value={cartTotal} />
        </tbody>
      </table>
      <button id="print-button" className="hide-for-print" onClick={orderCart}>
        Imprima el Recibo
      </button>
    </div>
  );

  function calcCartTotal() {
    let subtotal = cartItems
        .reduce((total, cartItem) => {
          return (total += +cartItem.subtotal);
        }, 0)
        .toFixed(2),
      taxes = taxFree ? 0 : (+subtotal * 0.115).toFixed(2),
      total = (+subtotal + +taxes).toFixed(2);
    setCartSubtotal(subtotal);
    setCartTaxes(taxes);
    setCartTotal(total);
  }
} // End of component

export default CartItems;
