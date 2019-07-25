import React from 'react'
import PropTypes from 'prop-types'

export default class Orders extends React.Component {
  static propTypes = {
    orders: PropTypes.array.isRequired
  };
  /**
   * @param props
   */

  constructor(props) {
    super(props);
    this.state = {
      orders: props.orders
    };
    console.log(this.state);
  }

  render() {
    let orders = this.state.orders;
    return (
      <div className="orders">
        <h1>Orders</h1>
        <table>
          <tbody>
            <tr>
              <th>DateTime</th>
              <th>Subtotal</th>
              <th>Taxes</th>
              <th>Total</th>
              <th>Cash</th>
              <th>Credit Card</th>
              <th>Check</th>
              <th>Debit</th>
            </tr>
          {orders.map((order, ind)=> {
            return (
              <tr key={ind}>
                <td><a href={`orders/${order.id}`}>{order.created_at}</a></td>
                <td>{order.subtotal}</td>
                <td>{order.taxes}</td>
                <td>{order.total}</td>
                <td>{order.cash_payed}</td>
                <td>{order.credit_card__payed}</td>
                <td>{order.check_payed}</td>
                <td>{order.debit_payed}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
}
