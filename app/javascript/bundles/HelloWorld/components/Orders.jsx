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
      orders: props.orders,
      displayedOrders: props.orders
    };
    console.log(this.state);
  }

  updateOrders = (e) => {
    e.persist();
    let startRange = new Date(document.getElementById('start-range').value).toISOString(),
        endRange = new Date(document.getElementById('end-range').value).toISOString(),
        orders = this.state.orders;
    console.log(startRange);
    console.log(endRange);
    orders = orders.filter((val)=>{
      let orderDate = new Date(val.created_at.split('T')[0]).toISOString();
      return (startRange <= orderDate && endRange >= orderDate)
    });
    this.setState({
      displayedOrders: orders
    })

  }

  render() {
    let orders = this.state.orders,
        displayedOrders = this.state.displayedOrders,
        today = new Date(),
        dd = String(today.getDate()).padStart(2, '0'),
        mm = String(today.getMonth() + 1).padStart(2, '0'),
        yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        console.log(today);
    return (
      <div className="orders">
        <h1>Orders</h1>
        <label>
          <input type="date" id="start-range" defaultValue={today} onChange={this.updateOrders} />
        </label>
        <label>
          <input type="date" id="end-range" defaultValue={today} onChange={this.updateOrders} />
        </label>
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
          {displayedOrders.map((order, ind)=> {
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
