import React from 'react'

const Cart = (props) => {
  let cart = props.cart,
      addCustomItemToCart= props.addCustomItemToCart,
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
      },
      displayCustomItemForm = (e) => {
        let customItemRow = document.getElementById('custom-item-row'),
            addCIToCart = () => {
              console.log('addCIToCart');
              let customItemName =  document.getElementById('custom-item-name').value,
              customItemPrice =  document.getElementById('custom-item-price').value,
              customItemQuantity =  document.getElementById('custom-item-quantity').value,
              customItemSubtotal = (+customItemPrice * +customItemQuantity).toFixed(2),
              customItemValues = {
                name:customItemName,
                priceGiven:customItemPrice,
                quantity:customItemQuantity,
                subtotal:customItemSubtotal
              }
              addCustomItemToCart(customItemValues);
              console.log(customItemValues);
              customItemRow.innerHTML = `
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                <td>
                 <button id="custom-item-button">Crear Elemento</button>
                </td>
              `;
              let customItemButton = document.getElementById('custom-item-button');
              customItemButton.addEventListener('click', displayCustomItemForm);
            }
        customItemRow.innerHTML = `
          <td></td>
          <td>
            <input type='text' id='custom-item-name' placeholder='Nombre' />
          </td>
          <td></td><td></td><td></td>
          <td>
            <input type='number' id='custom-item-price' placeholder='Precio' />
          </td>
          <td>
            <input type='number' id='custom-item-quantity' placeholder='Cantidad' />
          </td>
          <td></td>
          <td>
            <button id='add-to-cart-button'>Add to Cart</button>
          </td>
        `;
        let addToCartButton =  document.getElementById('add-to-cart-button');

        addToCartButton.addEventListener('click', addCIToCart);
      };
  return (
    <div id="cart">
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
            <th>Subtotal</th>
            <th className="hide-for-print">Borrar</th>
          </tr>
          { cart.cartItems.map((cartItem, ind) => {
            let soldPrice = cartItem.item.sold_price,
                defaultValuePrice = soldPrice ? soldPrice : cartItem.priceGiven;
            return (
              <tr key={ind} className="cart-item">
                <td>{cartItem.item.brand}</td>
                <td>{cartItem.item.name}</td>
                <td>{cartItem.item.color}</td>
                <td>{cartItem.item.size}</td>
                <td>{cartItem.item.thickness}</td>
                <td>
                  <input key={`item-price-${cartItem.item.id}`}
                    type="number"
                    id={`item-price-${cartItem.item.id}`}
                    className={`item-price`}
                    defaultValue={defaultValuePrice}
                    onChange={getSubtotal}
                  />
                </td>
                <td>
                  <input key={`item-quantity-${cartItem.item.id}`}
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
                  <button className="hide-for-print" onClick={()=> removeFromCart(cartItem.item.id)}>Remove Item</button>
                </td>
              </tr>
            )
          })}
          <tr id="custom-item-row">
            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            <td>
             <button id="custom-item-button" className="hide-for-print" onClick={displayCustomItemForm}> Crear Elemento</button>
            </td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            <td>Total Parcial</td>
            <td id="cart-subtotal-value">${cart.cartTotal.subtotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            <td>Impuestos</td>
            <td id="cart-taxes-value">${Number(cart.cartTotal.taxes).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            <td>Total</td>
            <td id="cart-total-value">${Number(cart.cartTotal.total).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
          </tr>
        </tbody>
      </table>
       <button id="print-button" className="hide-for-print"  onClick={printReciept}>Imprima el Recibo</button>
    </div>
  )
}

export default Cart
