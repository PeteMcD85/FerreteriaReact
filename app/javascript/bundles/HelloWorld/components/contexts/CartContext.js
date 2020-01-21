import React from "react";

const CartContext = React.createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartTotal: 0
});

export default CartContext;
