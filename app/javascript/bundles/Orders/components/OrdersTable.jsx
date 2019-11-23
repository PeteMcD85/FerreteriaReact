import React from "react";
import PropTypes from "prop-types";

const OrdersTable = props => {
  let orders = props.orders,
    tableCaption = props.tableCaption,
    displayedDate = (stringDate) => {
      const day = stringDate.split('T')[0],
        timeOfDay = stringDate.split('T')[1].split('.')[0]
      return `${day} ${timeOfDay}`
    },
    deleteItem = itemId => {
      let confirmed = confirm("Are you sure?");
      if (confirmed) {
        fetch(`/orders/${ordersId}`, {
          method: "delete"
        })
          .then(response => {
            if (!response.ok) {
              throw response;
            }
            return response.json();
          })
          .then(res => {
            updateItems(res.actives, res.inactives);
          })
          .catch(error => {
            console.error("error", error);
          });
      }
    };
  console.log(props);
  return (
    <table>
      <caption>{tableCaption}</caption>
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
        {orders.map((order, ind) => {
          return (
            <tr key={ind}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>
                <a href={`/orders/${order.id}`}>{displayedDate(order.created_at)}</a>
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
                -$
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
  );
};

export default OrdersTable;
