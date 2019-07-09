import React from 'react'

const Cart = (props) => {
  let cart = props.cart,
      removeFromCart = props.removeFromCart,
      updateQuantity = props.updateQuantity,
      updatePriceGiven = props.updatePriceGiven,
      subtotal = cart.reduce((total, cartItem)=> {
        return total += (+cartItem.priceGiven * cartItem.quantity)
      }, 0).toFixed(2),
      taxes = (subtotal * .115).toFixed(2),
      total = subtotal + taxes,
      getSubtotal = (e) => {
        let val = e.target.valueAsNumber,
            cssId = e.target.id.split('-'),
            itemId = cssId[2],
            columnName = (cssId[1] === "price") ? "price" : "quantity";
        (columnName === "price") ? updatePriceGiven(itemId, val) : updateQuantity(itemId, val);
      },
      printReciept = () => {
        console.log('printReciept');
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
                    value={(cartItem.priceGiven * cartItem.quantity).toFixed(2)}
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
            <td id="cart-subtotal-value">{subtotal}</td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td><td></td>
            <td>Taxes</td>
            <td id="cart-taxes-value">{taxes}</td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td><td></td>
            <td>Total</td>
            <td id="cart-total-value">{total}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={printReciept}>Print Reciept</button>

    </div>
  )
}

export default Cart
