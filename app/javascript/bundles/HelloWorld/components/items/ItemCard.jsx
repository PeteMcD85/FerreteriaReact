import React, { useState, useEffect, useContext, useRef } from "react";
// +++++++++ CONTEXTS +++++++++
import CartContext from "../contexts/CartContext";

function ItemCard(props) {
  const cartContext = useContext(CartContext);
  let item = props.item,
    { id, name, brand, color, size, thickness, stockNumber, inventory } = item,
    soldPrice = Number(item.sold_price).toFixed(2),
    quantityInput = useRef(null),
    addRemoveButton = useRef(null),
    { addToCart, removeFromCart } = cartContext;

  useEffect(() => {
    initInputAndText(id);
  }, []);
  return (
    <div className="item">
      {name && <h2>{name}</h2>}
      {brand && <p>{brand}</p>}
      {color && <p>{color}</p>}
      {size && <p>{size}</p>}
      {thickness && <p>{thickness}</p>}
      <h4>Precio: ${soldPrice}</h4>
      <div className="active-card">
        <a href={`/items/${id}/edit`}>Editar</a>
        <div className="update-cart-div">
          {stockNumber && <p>Número de Artículo: {stockNumber}</p>}
          {inventory && <p>Inventario: {inventory}</p>}
          <h4>
            Cantidad
            <input
              type="number"
              ref={quantityInput}
              className="quantity-input"
              defaultValue={""}
              disabled={""}
            ></input>
          </h4>
          <button
            ref={addRemoveButton}
            className="cart-button"
            onClick={() => addRemoveItem(id)}
          >
            {""}
          </button>
        </div>
      </div>
    </div>
  );
  function addRemoveItem(id) {
    let quantityValue = quantityInput.current.valueAsNumber;
    if (!quantityValue || quantityValue < 1 || quantityValue > inventory)
      return alert(
        `Quantity must be greater than 0 and less than ${inventory}`
      );
    !quantityInput.current.disabled
      ? addToCart(item, quantityValue)
      : removeFromCart(id);
    toggleTextNDisabled();
  }

  function toggleTextNDisabled() {
    // Stores the disabled boolean for quantity input
    let disabled = quantityInput.current.disabled;
    // Toggles Add/Remove from cart button's text
    addRemoveButton.current.innerText = disabled
      ? "Add to Cart"
      : "Remove from Cart";
    // Toggles disabled boolean of the quantity input
    quantityInput.current.disabled = !disabled;
  }

  function initInputAndText(id) {
    let itemInCart = cartContext.cartItems.find(ci => ci.item.id == id),
      value = itemInCart ? itemInCart.quantity : "",
      disabled = value ? true : false,
      text = disabled ? "Remove from Cart" : "Add to Cart";
    quantityInput.current.value = value;
    quantityInput.current.disabled = disabled;
    addRemoveButton.current.innerText = text;
  }
} // end of component

export default ItemCard;
