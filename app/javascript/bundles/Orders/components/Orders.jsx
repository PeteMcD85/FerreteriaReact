import React from "react";
import PropTypes from "prop-types";

import OrdersTable from "./OrdersTable";

export default class Orders extends React.Component {
  static propTypes = {
    // orders: PropTypes.array.isRequired
  };
  /**
   * @param props
   */

  constructor(props) {
    super(props);
    this.state = {
      displayedOrders: [],
      query: "",
      refundedOrders: []
    };
    console.log(this.state);
  }

  componentDidMount() {
    let startRange = new Date(
        document.getElementById("start-range").value
      ).toISOString(),
      endRange = new Date(document.getElementById("end-range").value)
        .toISOString,
      today = new Date();
    this.getOrdersRefunded(today, today);
  }

  updateOrders = () => {
    let startRange = new Date(
        document.getElementById("start-range").value
      ).toISOString(),
      endRange = new Date(
        document.getElementById("end-range").value
      ).toISOString();
    this.getOrdersRefunded(startRange, endRange);
    console.log(endRange);
    // this.setState({
    //   displayedOrders: orders
    // });
  };

  getSum = column => {
    let displayedOrders = this.state.displayedOrders,
      refundedOrders = this.state.refundedOrders,
      ordersToUse = column === "total_ref" ? refundedOrders : displayedOrders;
    console.log(displayedOrders);
    return ordersToUse.reduce((total, order) => {
      let numberrr = (+total + +order[column])
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      return Number(numberrr);
    }, 0);
    console.log("ordersToUse");
    console.log(ordersToUse);
  };

  searchOrder = e => {
    let query = e.target.value.trim().toLowerCase();
    fetch(`/get_orders_searched.json?query=${query}`)
      .then(res => res.json())
      .then(
        result => {
          console.log("working");
          console.log(result);
          this.setState({ displayedOrders: result.orders });
        },
        error => {
          console.error(
            "Error retrieving results for updateSelectedNavList AJAX method"
          );
          console.error(error);
        }
      );
  };

  getOrdersRefunded = (startRange, endRange) => {
    fetch(
      `/get_orders_refunded.json?startDate=${startRange}&endDate=${endRange}`
    )
      .then(res => res.json())
      .then(
        result => {
          console.log("working");
          this.setState({
            refundedOrders: result.refunded_orders,
            displayedOrders: result.orders
          });
        },
        error => {
          console.error(
            "Error retrieving results for orders and orders refunded AJAX method"
          );
          console.error(error);
        }
      );
  };

  render() {
    let orders = this.state.orders,
      displayedOrders = this.state.displayedOrders,
      refundedOrders = this.state.refundedOrders,
      today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    console.log(this.state);
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

        <OrdersTable orders={displayedOrders} tableCaption="Ordenes" />
        <OrdersTable
          orders={refundedOrders}
          tableCaption="Pedidos Reembolsados"
        />

        <table>
          <caption>Total De Ordenes</caption>
          <tbody>
            <tr>
              <th>Tarjeta De Crédito</th>
              <th>Débito</th>
              <th>Cheque</th>
              <th>Efectivo</th>
              <th>Total Reembolsado</th>
              <th>Total Parcial</th>
              <th>Impuestos</th>
              <th>Total</th>
            </tr>
            <tr>
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
              <td id="cash">
                $
                {Number(this.getSum("cash_payed"))
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
              <td>
                -$
                {Number(this.getSum("total_ref"))}
              </td>
              <td>${Number(this.getSum("subtotal"))}</td>
              <td>${Number(this.getSum("taxes"))}</td>
              <td id="total">${Number(this.getSum("total"))}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
