import React from "react";
import PropTypes from "prop-types";

export default class RefundedOrders extends React.Component {
  static propTypes = {
    refundOrder: PropTypes.object.isRequired
  };
  /**
   * @param props
   */

  constructor(props) {
    super(props);
    this.state = {
      refundOrder: this.props.refundOrder,
      refundItems: []
    };
    console.log(this.state);
  }

  componentDidMount() {
    this.getRefundItems();
  }

  getRefundItems = () => {
    const refundOrder = this.state.refundOrder;
    fetch(
      `/orders/${refundOrder.order_id}/refund_orders/${refundOrder.id}.json`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({ refundItems: result.refund_items });
        },
        error => {
          console.error(
            `Error retrieving Refund Items for Order : ${refundOrder.order_id}`
          );
          console.error(error);
        }
      );
  };

  displayRefundItem = (refundItem, column) => {
    console.log("displayRefundItem");
    if (refundItem.item) {
      return refundItem.item[column];
    } else {
      return refundItem.refundable[column] ? refundItem.refundable[column] : "";
    }
  };

  // displayRefundItem = () => {
  //   console.log('displayRefundItem');
  // }

  render() {
    const refundOrder = this.state.refundOrder,
      refundItems = this.state.refundItems;
    console.log(this.state);
    return (
      <table>
        <caption>Refund Number : {refundOrder.id}</caption>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Nombre</th>
            <th>Color</th>
            <th>Tamaño</th>
            <th>Grosor</th>
            <th>Precio Dado</th>
            <th>Cantidad Comprada</th>
            <th>Cantidad Reembolsada</th>
            {/*<th>Subtotal De Reembolso</th>*/}
          </tr>
        </thead>
        <tbody>
          {refundItems.map((refundItem, ind) => {
            return (
              <tr key={ind}>
                <td>{this.displayRefundItem(refundItem, "brand")}</td>
                <td>{this.displayRefundItem(refundItem, "name")}</td>
                <td>{this.displayRefundItem(refundItem, "color")}</td>
                <td>{this.displayRefundItem(refundItem, "size")}</td>
                <td>{this.displayRefundItem(refundItem, "thickness")}</td>
                <td>
                  $
                  {Number(refundItem.refundable.price_given)
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>
                  {Number(refundItem.refundable.quantity)}
                </td>
                <td>{refundItem.quantity_refunded}</td>
                {/*      <td>
                  {Number(refundItem.subtotal_refunded)
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td> */}
              </tr>
            );
          })}
          <tr>
            {" "}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Subtotal De Reembolso</td>
            <td>
              $
              {Number(refundOrder.subtotal_refunded)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Taxes De Reembolso</td>
            <td>
              $
              {Number(refundOrder.taxes_refunded)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td>Total De Reembolso</td>
            <td id="total">
              $
              {Number(refundOrder.total_refunded)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
