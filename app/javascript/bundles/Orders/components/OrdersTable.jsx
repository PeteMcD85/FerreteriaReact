import React from "react";
import PropTypes from "prop-types";

const OrdersTable = props => {
  let orders = props.orders,
    tableCaption = props.tableCaption;
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
  );
};

export default OrdersTable;
