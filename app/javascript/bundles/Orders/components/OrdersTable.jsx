import React from "react";
import PropTypes from "prop-types";

const OrdersTable = props => {
  let orders = props.orders,
    tableCaption = props.tableCaption,
    isRefundedOrder = tableCaption === "Ordenes" ? false : true,
    displayDate = (stringDate) => {
      const splitDate = stringDate.split('T'),
        day = splitDate[0],
        timeOfDay = splitDate[1].split('.')[0].split(':').slice(0,2),
        meridiem = +timeOfDay[0] < 12 ? 'AM' : 'PM';
        timeOfDay[0] = meridiem === 'AM' ? timeOfDay[0] : +timeOfDay[0] - 12;
      return `${day} ${timeOfDay.join(':') + meridiem}`
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
          { isRefundedOrder && <th>Total Reembolsado</th>}
          {!isRefundedOrder && <th>Total Parcial</th>}
          {!isRefundedOrder && <th>Impuestos</th>}
          {!isRefundedOrder && <th>Total</th>}



        </tr>
        {orders.map((order, ind) => {
          return (
            <tr key={ind}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>
                <a href={`/orders/${order.id}`}>{displayDate(order.created_at)}</a>
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

              { isRefundedOrder &&
                <td>
                  -$
                  {Number(order.total_ref)
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
              }
              { !isRefundedOrder &&
                <td>
                  $
                  {Number(order.subtotal)
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
              }
              { !isRefundedOrder &&
                <td>
                  $
                  {Number(order.taxes)
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
              }
              { !isRefundedOrder &&
                <td>
                  $
                  {Number(order.total)
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
              }

            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrdersTable;
