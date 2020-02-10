import React, { useState, useEffect, useRef, useContext } from "react";
import LS from "local-storage";

import CartContext from "../contexts/CartContext";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import CustomItemForm from "./CustomItemForm";

function CartItems(props) {
  let { taxFree, orderCart, cartTotal, setCartTotal, printButtonText } = props,
    // Reference to all Saved Carts
    [savedCarts, setSavedCarts] = useState([]),
    printButton = useRef(null),
    { cartItems, setCartItems } = useContext(CartContext);
  // "ci" is to assure consistent displayed order
  let ci = cartItems.slice().sort((a, b) => a.cartId - b.cartId);

  useEffect(() => {
    let sc = LS.get("savedCarts");
    if (!sc) LS.set("savedCarts", []);
    setSavedCarts(sc);
  }, []);

  useEffect(() => {
    LS.set("savedCarts", savedCarts);
    console.log(savedCarts);
  }, [savedCarts]);

  useEffect(() => {
    calcCartTotal();
  }, [taxFree, cartItems]);

  useEffect(() => {
    printButton.current.disabled = printButtonText.includes("Imprima")
      ? false
      : true;
  }, [printButtonText]);

  // let test = cart.cartTotal.taxes;

  return (
    <div id="cart">
      <div id="saved-carts">
        {savedCarts &&
          savedCarts.map((savedCart, ind) => {
            return (
              <div className="saved-cart hide-for-print" key={ind}>
                <span
                  className="remove-saved-cart"
                  onClick={() => removeSavedCart(ind)}
                >
                  x
                </span>
                <button
                  className="saved-cart-button"
                  onClick={e => displaySavedCart(e, ind)}
                >
                  {ind + 1}
                </button>
              </div>
            );
          })}
      </div>

      <button className="hide-for-print"onClick={() => saveCart(ci)}>Save Cart</button>
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
          <CartTotal name="Subtotal" value={cartTotal.subtotal} />
          <CartTotal name="Taxes" value={cartTotal.taxes} />
          <CartTotal name="Total" value={cartTotal.total} />
        </tbody>
      </table>
      <button
        id="print-button"
        ref={printButton}
        className="hide-for-print"
        onClick={() => orderCart(ci)}
      >
        {printButtonText}
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
    setCartTotal({ subtotal, taxes, total });
  }

  function clearCart() {
    // Active Class is for when a saved Cart is selected
    removeAllActiveClass(".saved-cart-button");
    // Empties cartItems
    setCartItems([]);
  }

  function saveCart(ci) {
    console.log(ci);
    let sc = savedCarts.slice();
    sc.push(ci);
    // Appends cart Items to saved carts array
    console.log(sc);
    setSavedCarts(sc);
    setCartItems([]);
    window.location.href = "/";
    // Clears Cart

    // Redirects to root page
    // window.location.href = "/";
  }

  function displaySavedCart(e, savedCartIndex) {
    let savedCart = savedCarts[savedCartIndex],
      savedCartButton = e.target;
    // Sets the cartItems to the clicked Saved Cart
    setCartItems(savedCart);
    // Active Class is for when a saved Cart is selected
    removeAllActiveClass(".saved-cart-button");
    // Adds the Active class to the clicked Saved Cart Button
    savedCartButton.classList.add("active");
  }

  function removeAllActiveClass(selector) {
    // An array of all buttons on the page that matches the selector passed in param
    let buttons = [...document.querySelectorAll(selector)];
    // removes Active class from all buttons
    buttons.forEach(button => button.classList.remove("active"));
  }

  function removeSavedCart(savedCartIndex) {
    setSavedCarts(savedCarts.filter((sc, ind) => ind != savedCartIndex));
  }
} // End of component

export default CartItems;
