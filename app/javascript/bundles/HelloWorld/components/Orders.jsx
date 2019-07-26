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
  }

  render() {
    let orders = this.state.orders;
    return (
      <div className="orders">
        <h1>Orders</h1>
        <ul>
          {orders.map((order, ind)=> {
            return <li key={ind}><a href={`orders/${order.id}`}>{order.created_at}</a></li>
          })}
        </ul>
      </div>
    )
  }
}
