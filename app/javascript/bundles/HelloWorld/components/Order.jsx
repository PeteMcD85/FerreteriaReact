import React from 'react'
import PropTypes from 'prop-types'

export default class Order extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    cart: PropTypes.array.isRequired,
    cartItems: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      order: props.order,
      cart: props.cart,
      cartItems: props.cartItems
    }
    console.log(this.state);
  }

  refundItem = (e) => {
    e.persist();
    console.log(e);
    let cssId = e.target.id,
        itemId = cssId.split('-')[1],
        quantityValue = document.getElementById(`quantity-${itemId}`).value,
        cartItemRow = document.getElementById(`cart-item-${itemId}`),
        tdParent = e.target.parentNode;
    addRefundQuantityColumn();
    // input.setAttribute('type', 'number');
    // input.setAttribute('id', `refund-quantity-${itemId}`);
    // cartItemRow.insertBefore(td, tdParent);
    // console.log(tableHeaders);
    function addRefundQuantityColumn(){
      let tableHeaders = document.getElementById('order-th'),
          thChildren = tableHeaders.children,
          RefQuantExist = [...thChildren].find((val)=> val.innerText === "Refund Quantity");
      if(!RefQuantExist) addTH()
      function addTH(){
        let th = document.createElement("th"),
            text = document.createTextNode("Refund Quantity");
        th.appendChild(text);
        tableHeaders.insertBefore(th, tableHeaders.childNodes[thChildren.length-1]);

      }
      function addTD(){
        let td = document.createElement("td"),
            input = document.createElement("input");
        td.appendChild(input);
      }
    }

  }

  render(){
    let order = this.state.order,
        cart = this.state.cart,
        cartItems = this.state.cartItems;
    return (
      <div className="order">
        <h1>{order.id}</h1>
        <table>
          <tbody>
            <tr id={`order-th`}>
              <th>Brand</th>
              <th>Name</th>
              <th>Color</th>
              <th>Size</th>
              <th>Thickness</th>
              <th>Price</th>
              <th>Price Given</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
            {cartItems.map((cartItem, ind)=> {
              return (
                <tr key={ind} id={`cart-item-${cartItem.id}`}>
                  <td>{cartItem.brand}</td>
                  <td>{cartItem.name}</td>
                  <td>{cartItem.color}</td>
                  <td>{cartItem.size}</td>
                  <td>{cartItem.thickness}</td>
                  <td>{cartItem.price}</td>
                  <td>{cart[ind].price_given}</td>
                  <td id={`quantity-${cartItem.id}`}>{cart[ind].quantity}</td>
                  <td>{cart[ind].subtotal}</td>
                  <td>
                    <button onClick={this.refundItem} id={`refund-${cartItem.id}`}>Refund</button>
                  </td>
                </tr>
              )
            })}
            <tr>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              <td>Subtotal</td>
              <td id="cart-subtotal-value">{order.subtotal}</td>
            </tr>
            <tr>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              <td>Taxes</td>
              <td id="cart-taxes-value">{order.taxes}</td>
            </tr>
            <tr>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              <td>Total</td>
              <td id="cart-total-value">{order.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
