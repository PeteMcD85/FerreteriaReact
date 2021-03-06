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
    return ordersToUse
      .reduce((total, order) => {
        return +total + +order[column];
      }, 0)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    console.log(refundedOrders);
    return (
      <div className="orders">
        <div>
          <h4>Fechas</h4>
          <div className="date-range">
            <label>
              Desde{" "}
              <input
                type="date"
                id="start-range"
                defaultValue={today}
                onChange={this.updateOrders}
              />
            </label>

            <label>
              a{" "}
              <input
                type="date"
                id="end-range"
                defaultValue={today}
                onChange={this.updateOrders}
              />
            </label>
          </div>
          <div className="search-orders hide-for-print">
            <label>
              {" "}
              Buscar:
              <input type="text" onChange={this.searchOrder} />
            </label>
          </div>
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
              <td>${this.getSum("credit_card_payed")}</td>
              <td>${this.getSum("debit_payed")}</td>
              <td>${this.getSum("check_payed")}</td>
              <td className="cash">${this.getSum("cash_payed")}</td>
              <td className="refund">
                -$
                {this.getSum("total_ref")}
              </td>
              <td>${this.getSum("subtotal")}</td>
              <td>${this.getSum("taxes")}</td>
              <td className="total">${this.getSum("total")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
