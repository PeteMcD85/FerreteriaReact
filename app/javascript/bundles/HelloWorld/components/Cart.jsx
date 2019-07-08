import React from 'react'

const Cart = (props) => {
  let  cart = props.cart;
  console.log(cart);
  return (
    <div id="cart">
      { cart.map((cartItem, ind) => {
        return <p key={ind} >{cartItem.item.id}</p>
      })}
    </div>
  )
}

export default Cart
