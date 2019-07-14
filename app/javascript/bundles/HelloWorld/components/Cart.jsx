import React from 'react'

const Cart = (props) => {
  let cart = props.cart,
      removeFromCart = props.removeFromCart,
      updateCartItem = props.updateCartItem,
      orderCart = props.orderCart,
      getSubtotal = (e) => {
        let columnValue = e.target.valueAsNumber,
            cssId = e.target.id.split('-'),
            itemId = cssId[2],
            columnName = (cssId[1] === "price") ? "priceGiven" : "quantity";
            updateCartItem(itemId, columnName, columnValue);
      },
      printReciept = () => {
        console.log('printReciept');
        orderCart();
      }
  return (
    <div id="cart">
      <table>
        <tbody>
          <tr>
            <th>Brand</th>
            <th>Name</th>
            <th>Color</th>
            <th>Size</th>
            <th>Thickness</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Remove</th>
          </tr>
          { cart.cartItems.map((cartItem, ind) => {
            return (
              <tr key={ind} className="cart-item">
                <td>{cartItem.item.brand}</td>
                <td>{cartItem.item.name}</td>
                <td>{cartItem.item.color}</td>
                <td>{cartItem.item.size}</td>
                <td>{cartItem.item.thickness}</td>
                <td>
                  <input
                    type="number"
                    id={`item-price-${cartItem.item.id}`}
                    className={`item-price`}
                    defaultValue={cartItem.item.sold_price}
                    onChange={getSubtotal}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    id={`item-quantity-${cartItem.item.id}`}
                    className={`item-quantity`}
                    defaultValue={cartItem.quantity}
                    onChange={getSubtotal}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    id={`item-subtotal-${cartItem.item.id}`}
                    className={`item-subtotal`}
                    disabled={true}
                    value={cartItem.subtotal}
                  />
                </td>
                <td>
                  <button onClick={()=> removeFromCart(cartItem.item.id)}>Remove Item</button>
                </td>
              </tr>
            )
          })}
          <tr>
            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            <td>Subtotal</td>
            <td id="cart-subtotal-value">{cart.cartTotal.subtotal}</td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            <td>Taxes</td>
            <td id="cart-taxes-value">{cart.cartTotal.taxes}</td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            <td>Total</td>
            <td id="cart-total-value">{cart.cartTotal.total}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={printReciept}>Print Reciept</button>

    </div>
  )
}

export default Cart
