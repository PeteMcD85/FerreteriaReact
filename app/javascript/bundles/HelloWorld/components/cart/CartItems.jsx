import React, { useState, useEffect, useRef, useContext } from "react";

import CartContext from "../contexts/CartContext";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import CustomItemForm from "./CustomItemForm";

function CartItems(props) {
  let { taxFree, orderCart, cartTotal, setCartTotal } = props,
    [cartSubtotal, setCartSubtotal] = useState(0),
    [cartTaxes, setCartTaxes] = useState(0),
    { cartItems } = useContext(CartContext);
  // "ci" is to assure consistent displayed order
  let ci = cartItems.slice().sort(function(a, b) {
    return a.cartId - b.cartId;
  });

  useEffect(() => {
    calcCartTotal();
  }, [taxFree, cartItems]);

  // let test = cart.cartTotal.taxes;

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
          {ci.map((cartItem, ind) => {
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
