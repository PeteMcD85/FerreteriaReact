import React, { useState, useRef, useContext } from "react";
import CartContext from "../contexts/CartContext";

function CartItem(props) {
  let { cartItem } = props,
    { removeFromCart, updateCartItem } = useContext(CartContext),
    priceGivenInput = useRef(null),
    quantityInput = useRef(null);
  return (
    <tr className="cart-item">
      <td>{cartItem.item.brand}</td>
      <td>{cartItem.item.name}</td>
      <td>{cartItem.item.color}</td>
      <td>{cartItem.item.size}</td>
      <td>{cartItem.item.thickness}</td>
      <td>
        $
        <input
          type="number"
          ref={priceGivenInput}
          className={`item-price`}
          defaultValue={cartItem.priceGiven}
          onBlur={getSubtotal}
        />
      </td>
      <td>
        <input
          type="number"
          ref={quantityInput}
          className={`item-quantity`}
          defaultValue={cartItem.quantity}
          onBlur={getSubtotal}
        />
      </td>
      <td>
        $
        <input
          type="number"
          className={`item-subtotal`}
          disabled={true}
          value={cartItem.subtotal}
        />
      </td>
      <td>
        <button
          className="hide-for-print"
          onClick={() => removeFromCart(cartItem.item.id)}
        >
          Remove Item
        </button>
      </td>
    </tr>
  );
  function getSubtotal() {
    updateCartItem(cartItem.item.id, priceGiven, quantity);
  }
}
export default CartItem;
