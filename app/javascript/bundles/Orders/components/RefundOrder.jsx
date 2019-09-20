import React from "react";
import PropTypes from "prop-types";

export default class RefundOrder extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    custom_items: PropTypes.array.isRequired,
    item_orders: PropTypes.array.isRequired
  };
  /**
   * @param props
   */

  constructor(props) {
    super(props);
    this.state = {
      order: props.order,
      customItems: props.custom_items,
      itemOrders: props.item_orders,
      newRefund: 0
    };
  }

  componentDidMount() {
  }

refundChange = () => {
  console.log('refundChange');
}

  render() {

    let order = this.state.order,
      itemOrders = this.state.itemOrders,
      customItems = this.state.customItems;
    console.log(this.state);
    return (
      <div className="refund-order">
      <h1>{order.id}</h1>
        <table>
          <caption>Refund Order</caption>
          <tbody>
            <tr>
              <th>Marca</th>
              <th>Nombre</th>
              <th>Color</th>
              <th>Tamaño</th>
              <th>Grosor</th>
              <th>Precio Dado</th>
              <th>Cantidad</th>

              <th>Cantidad Reembolsada Antes</th>
              <th>New Refund</th>
              <th>Subtotal De Reembolso</th>
              <th>Total Parcial</th>
            </tr>
            {itemOrders.map((itemOrder, ind)=>{
              // let max =  itemOrder.quantity -
              return (
                <tr key={ind} className="item-order">
                  <td>{ itemOrder.item.brand }</td>
                  <td>{ itemOrder.item.name }</td>
                  <td>{ itemOrder.item.color }</td>
                  <td>{ itemOrder.item.size }</td>
                  <td>{ itemOrder.item.thickness }</td>
                  <td>{ itemOrder.price_given}</td>
                  <td>{ itemOrder.quantity }</td>

                  <td>{ itemOrder.quantity_refunded }</td>
                  <td><input type="number" onChange={this.refundChange} /></td>
                  <td id={`io-subtotal-refunded-${itemOrder.ind}`}></td>
                  <td>{ itemOrder.subtotal }</td>
                </tr>
              )
            })}
            {customItems.map((customItem, ind)=>{
              return (
                <tr key={ind} className="custom-item">
                  <td></td>
                  <td>{customItem.name} </td>
                  <td></td><td></td><td></td>
                  <td>${customItem.price_given}</td>
                  <td>{customItem.quantity} </td>

                  <td>{customItem.quantity_refunded} </td>
                  <td><input type="number" onChange={this.refundChange} /></td>
                  <td id={`ci-subtotal-refunded-${customItem.ind}`}> </td>
                  <td>${customItem.subtotal} </td>
                  <td></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
