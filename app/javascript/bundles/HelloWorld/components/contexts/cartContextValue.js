let CartContextValue = {
  cartItems: [],
  cartTotal: {
    subtotal: 0,
    taxes: 0,
    total: 0
  },
  logCart: () => {},
  addToCart: (cartItems, item, quantity) => {
    cartItems.push({
      item: item,
      quantity: quantity,
      priceGiven: item.sold_price,
      subtotal: (+quantity * +item.sold_price).toFixed(2)
    });
  }
};

export default CartContextValue;
