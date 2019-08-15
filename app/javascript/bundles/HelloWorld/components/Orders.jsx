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
      displayedOrders: props.orders,
      query:''
    };
    console.log(this.state);
  }

  componentDidMount() {
    this.updateOrders();
  }

  updateOrders = () => {
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

  getSum = (column) => {
    let displayedOrders = this.state.displayedOrders;
    return displayedOrders.reduce((total, order) => {
      return (+total + +order[column]).toFixed(2)
    }, 0)
  }

  searchOrder = (e) => {
    let query = e.target.value.trim(),
        orders = this.state.orders,
        displayedOrders = orders.filter((order)=>{
          let orderName = order.name ? order.name : "";
          return( String(order.id).includes(query) || orderName.includes(query) )
        })

    this.setState({ displayedOrders: displayedOrders})
  }

  render() {
    let orders = this.state.orders,
        displayedOrders = this.state.displayedOrders,
        today = new Date(),
        dd = String(today.getDate()).padStart(2, '0'),
        mm = String(today.getMonth() + 1).padStart(2, '0'),
        yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
  return (
    <div className="orders">
      <div className="hide-for-print">
        <h4>Fechas</h4>
      <div className="date-range">
        <p>Desde</p>
        <label>
          <input type="date" id="start-range" defaultValue={today} onChange={this.updateOrders} />
        </label>
        <p>a</p>
        <label>
          <input type="date" id="end-range" defaultValue={today} onChange={this.updateOrders} />
        </label>
      </div>
      <div className="search-orders">
        <label> Buscar:
          <input type="text" onChange={this.searchOrder} />
        </label>
      </div>
    </div>
        <table>
          <tbody>
            <tr>
              <th>Order Number</th>
              <th>Nombre</th>
              <th>Fecha Y Hora</th>
              <th>Subtotal</th>
              <th>Taxes</th>
              <th>Total</th>
              <th>Cash</th>
              <th>Credit Card</th>
              <th>Check</th>
              <th>Debit</th>
              <th>Total Refunded</th>
            </tr>
          {displayedOrders.map((order, ind)=> {
            return (
              <tr key={ind}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td><a href={`/orders/${order.id}`}>{order.created_at}</a></td>
                <td>${order.subtotal}</td>
                <td>${order.taxes}</td>
                <td>${order.total}</td>
                <td>${order.cash_payed}</td>
                <td>${order.credit_card_payed}</td>
                <td>${order.check_payed}</td>
                <td>${order.debit_payed}</td>
                <td>${order.total_refunded}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
        <table>
            <caption>Total de Ordenes</caption>
          <tbody>
            <tr>
              <th>Subtotal</th>
              <th>Taxes</th>
              <th>Total</th>
              <th>Cash</th>
              <th>Credit Card</th>
              <th>Check</th>
              <th>Debit</th>
              <th>Total Refunded</th>
            </tr>
          <tr>
            <td>${this.getSum('subtotal')}</td>
            <td>${this.getSum('taxes')}</td>
            <td>${this.getSum('total')}</td>
            <td>${this.getSum('cash_payed')}</td>
            <td>${this.getSum('credit_card_payed')}</td>
            <td>${this.getSum('check_payed')}</td>
            <td>${this.getSum('debit_payed')}</td>
            <td>${this.getSum('total_refunded')}</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
