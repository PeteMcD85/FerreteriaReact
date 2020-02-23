import React, { useState, useEffect, useContext } from "react";
import CartContext from "../contexts/CartContext";
function CustomItemForm(props) {
  let { showRow } = props,
    [item, setItem] = useState({}),
    [name, setName] = useState(),
    [priceGiven, setPriceGiven] = useState(0),
    [quantity, setQuantity] = useState(0),
    [displayCustomItemForm, setDisplayCustomItemForm] = useState(false),
    { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    // Mimicing how a regular Item would be modeled to use addToCart
    setItem({ id: setId(), name, sold_price: priceGiven });
  }, [name, priceGiven, quantity]);

  return (
    <tr>{displayCustomItemForm ? <CustomItemForm /> : addCustomItem()}</tr>
  );

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

  function addCustomItem() {
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

  function CustomItemForm() {
    return (
      <>
        <td></td>
        <td>
          <input
            id="name"
            type="text"
            placeholder="Nombre"
            onBlur={e => setName(e.target.value)}
            defaultValue={name}
          />
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <>&#36;</>
          <input
            id="price"
            type="number"
            placeholder="Precio"
            onBlur={e => checkMin(e)}
            min={0}
            defaultValue={priceGiven}
          />
        </td>
        <td>
          <input
            type="number"
            id="quantity"
            placeholder="Cantidad"
            onBlur={e => checkMin(e)}
            min={0}
            defaultValue={quantity}
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
    console.log(setName(e));
  }
  function checkMin(e) {
    let val = e.target.valueAsNumber,
      newVal = val < 0 ? "0" : val.toString(),
      id = e.target.id;
    if (val < 0) alert("Must be greater than 0");
    return id === "price" ? setPriceGiven(newVal) : setQuantity(newVal);
  }
} // End of component

export default CustomItemForm;
