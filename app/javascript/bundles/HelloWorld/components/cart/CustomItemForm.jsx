import React, { useState, useEffect, useContext } from "react";
import CartContext from "../contexts/CartContext";
function CustomItemForm(props) {
  let { showRow } = props,
    [item, setItem] = useState({}),
    [name, setName] = useState(""),
    [priceGiven, setPriceGiven] = useState(),
    [quantity, setQuantity] = useState(),
    [displayCustomItemForm, setDisplayCustomItemForm] = useState(false),
    { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    // Mimicing how a regular Item would be modeled to use addToCart
    setItem({ id: setId(), name, sold_price: priceGiven });
  }, [name, priceGiven, quantity]);

  return <tr>{displayCustomItemForm ? customForm() : noCustomForm()}</tr>;

  function setId() {
    // Stores a reference of the last Custom Item in the CartItems array
    let lastCustomItem = cartItems.reverse().find(ci => ci.item.id >= 9999);
    //Sets Custom Items Id to 9999 or greater, assures no duplicate
    return lastCustomItem ? lastCustomItem.item.id + 1 : 9999;
  }

  function addToCartPrep() {
    setDisplayCustomItemForm(false);
    addToCart(item, quantity);
  }

  function noCustomForm() {
    console.log(cartItems);
    return (
      <>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <button
            id="custom-item-button"
            className="hide-for-print"
            onClick={() => setDisplayCustomItemForm(true)}
          >
            Crear Elemento
          </button>
        </td>
      </>
    );
  }

  function customForm() {
    return (
      <>
        <td></td>
        <td>
          <input
            type="text"
            placeholder="Nombre"
            onChange={e => setName(e.target.value)}
          />
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <>&#36;</>
          <input
            type="number"
            placeholder="Precio"
            onChange={e => setPriceGiven(e.target.valueAsNumber)}
          />
        </td>
        <td>
          <input
            type="number"
            placeholder="Cantidad"
            onChange={e => setQuantity(e.target.valueAsNumber)}
          />
        </td>
        <td></td>
        <td>
          <button id="add-to-cart-button" onClick={addToCartPrep}>
            Add to Cart
          </button>
        </td>
      </>
    );
  }
} // End of component

export default CustomItemForm;
