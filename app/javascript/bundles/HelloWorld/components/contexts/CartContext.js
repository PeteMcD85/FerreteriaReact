import React from "react";

const CartContext = React.createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {}
});

export default CartContext;
