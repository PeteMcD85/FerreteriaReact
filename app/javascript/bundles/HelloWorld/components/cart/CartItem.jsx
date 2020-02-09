import React, { useState, useContext } from "react";
import CartContext from "../contexts/CartContext";

function CartItem(props) {
  let { cartItem } = props,
    [priceGiven, setPriceGiven] = useState(cartItem.priceGiven),
    [quantity, setQuantity] = useState(cartItem.quantity),
    { removeFromCart, updateCartItem } = useContext(CartContext);

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
          className={`item-price`}
          defaultValue={cartItem.priceGiven}
          onChange={e => setPriceGiven(e.target.valueAsNumber)}
          onBlur={updateSubtotal}
        />
      </td>
      <td>
        <input
          type="number"
          className={`item-quantity`}
          defaultValue={cartItem.quantity}
          onChange={e => setQuantity(e.target.valueAsNumber)}
          onBlur={updateSubtotal}
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
  function updateSubtotal() {
    updateCartItem(cartItem.item.id, priceGiven, quantity);

    function checkMin(e) {
      let val = e.target.valueAsNumber,
        newVal = val < 0 ? "0" : val.toString(),
        id = e.target.id;
      if (val < 0) alert("Must be greater than 0");
      return id === "price" ? setPriceGiven(newVal) : setQuantity(newVal);
    }
  }
}
export default CartItem;
