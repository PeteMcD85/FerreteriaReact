import React from "react";
import PropTypes from "prop-types";

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
      query: ""
    };
    console.log(this.state);
  }

  componentDidMount() {
    this.updateOrders();
  }

  updateOrders = () => {
    let startRange = new Date(
        document.getElementById("start-range").value
      ).toISOString(),
      endRange = new Date(
        document.getElementById("end-range").value
      ).toISOString(),
      orders = this.state.orders;
    console.log(startRange);
    console.log(endRange);
    orders = orders.filter(val => {
      let orderDate = new Date(val.created_at.split("T")[0]).toISOString();
      return startRange <= orderDate && endRange >= orderDate;
    });
    this.setState({
      displayedOrders: orders
    });
  };

  getSum = column => {
    let displayedOrders = this.state.displayedOrders;
    return displayedOrders.reduce((total, order) => {
      return (+total + +order[column]).toFixed(2);
    }, 0);
  };

  searchOrder = e => {
    let query = e.target.value.trim(),
      orders = this.state.orders,
      displayedOrders = orders.filter(order => {
        let orderName = order.name ? order.name : "";
        return String(order.id).includes(query) || orderName.includes(query);
      });

    this.setState({ displayedOrders: displayedOrders });
  };

  getItemOrdersRefunded = () => {
    let startDate = "steve",
      endDate = "pete";
    fetch(
      `/get_item_orders_refunded.json?startDate=${startDate}&endDate=${endDate}`
    )
      .then(res => res.json())
      .then(
        result => {
          console.log("working");
          console.log(result);
        },
        error => {
          console.error(
            "Error retrieving results for updateSelectedNavList AJAX method"
          );
          console.error(error);
        }
      );
  };

  render() {
    let orders = this.state.orders,
      displayedOrders = this.state.displayedOrders,
      today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    this.getItemOrdersRefunded();
    return (
      <div className="orders">
        <h4>Fechas</h4>
        <div className="date-range">
          <p>Desde</p>
          <label>
            <input
              type="date"
              id="start-range"
              defaultValue={today}
              onChange={this.updateOrders}
            />
          </label>
          <p>a</p>
          <label>
            <input
              type="date"
              id="end-range"
              defaultValue={today}
              onChange={this.updateOrders}
            />
          </label>
        </div>
        <div className="search-orders">
          <label>
            {" "}
            Buscar:
            <input type="text" onChange={this.searchOrder} />
          </label>
        </div>
        <p>Ordenes</p>
        <table>
          <tbody>
            <tr>
              <th>Número De Orden</th>
              <th>Nombre</th>
              <th>Fecha Y Hora</th>
              <th>Efectivo</th>
              <th>Tarjeta De Crédito</th>
              <th>Débito</th>
              <th>Cheque</th>
              <th>Total Reembolsado</th>
              <th>Total Parcial</th>
              <th>Impuestos</th>
              <th>Total</th>
            </tr>
            {displayedOrders.map((order, ind) => {
              return (
                <tr key={ind}>
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>
                    <a href={`/orders/${order.id}`}>{order.created_at}</a>
                  </td>
                  <td>
                    $
                    {Number(order.cash_payed)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td>
                    $
                    {Number(order.credit_card_payed)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td>
                    $
                    {Number(order.debit_payed)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td>
                    $
                    {Number(order.check_payed)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td>
                    $
                    {Number(order.total_refunded)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td>
                    $
                    {Number(order.subtotal)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td>
                    $
                    {Number(order.taxes)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td>
                    $
                    {Number(order.total)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table>
          <caption>Item-Order Refund</caption>
          <tbody>
            <tr>
              <th>Order Number</th>
              <th>Item Name</th>
              <th>Item Brand</th>
              <th>Item Size</th>
              <th>Item Quantity</th>
              <th>Subtotal Refund</th>
              <th>taxes Refund</th>
              <th>Total Refund</th>
            </tr>
            <tr>
              <td> </td>
            </tr>
          </tbody>
        </table>
        <table>
          <caption>Total De Ordenes</caption>
          <tbody>
            <tr>
              <th>Efectivo</th>
              <th>Tarjeta De Crédito</th>
              <th>Débito</th>
              <th>Cheque</th>
              <th>Total Reembolsado</th>
              <th>Total Parcial</th>
              <th>Impuestos</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>
                $
                {Number(this.getSum("cash_payed"))
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
              <td>
                $
                {Number(this.getSum("credit_card_payed"))
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
              <td>
                $
                {Number(this.getSum("debit_payed"))
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
              <td>
                $
                {Number(this.getSum("check_payed"))
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
              <td>
                $
                {Number(this.getSum("total_refunded"))
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
              <td>
                $
                {Number(this.getSum("subtotal"))
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
              <td>
                $
                {Number(this.getSum("taxes"))
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
              <td>
                $
                {Number(this.getSum("total"))
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
