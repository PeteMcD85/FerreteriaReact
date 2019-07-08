import React from 'react'

const Cart = (props) => {
  let cart = props.cart,
      removeFromCart = props.removeFromCart,
      subtotal = cart.reduce((total, cartItem)=> {
        return total += (+cartItem.item.price * cartItem.quantity)
      }, 0),
      getSubtotal = (e) => {
        let val = e.target.valueAsNumber,
            cssId = e.target.id.split('-'),
            itemId = cssId[2],
            otherColumnName = (cssId[1] === "price") ? "quantity" : "price",
            otherColumnValue = document.getElementById(`item-${otherColumnName}-${itemId}`).valueAsNumber,
            subtotalInput = document.getElementById(`item-subtotal-${itemId}`),
            cartSubtotal = document.getElementById('cart-subtotal-value'),
            cartTaxes = document.getElementById('cart-taxes-value'),
            cartTotal = document.getElementById('cart-total-value');
        subtotalInput.value = (val * otherColumnValue).toFixed(2);
        let subtotalInputs = [...document.getElementsByClassName('item-subtotal')],
            subtotal = subtotalInputs.reduce((total, subtotalInput)=> {
              return total += subtotalInput.valueAsNumber
            }, 0).toFixed(2),
            taxes = (subtotal * 0.07).toFixed(2),
            total = (+subtotal + +taxes).toFixed(2);
        cartSubtotal.innerHTML = subtotal;
        cartTaxes.innerHTML = taxes;
        cartTotal.innerHTML = total;
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
          </tr>
          { cart.map((cartItem, ind) => {
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
                    defaultValue={cartItem.item.price}
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
                    value={(cartItem.item.price * cartItem.quantity).toFixed(2)}
                  />
                </td>
                <td>
                  <button onClick={()=> removeFromCart(cartItem.item.id)}>Remove Item</button>
                </td>
              </tr>
            )
          })}
          <tr>
            <td></td><td></td><td></td><td></td><td></td><td></td>
            <td>Subtotal</td>
            <td id="cart-subtotal-value">{subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td><td></td>
            <td>Taxes</td>
            <td id="cart-taxes-value">{(subtotal *.07).toFixed(2)}</td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td><td></td>
            <td>Total</td>
            <td id="cart-total-value">{(subtotal + (subtotal * 0.07)).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default Cart
