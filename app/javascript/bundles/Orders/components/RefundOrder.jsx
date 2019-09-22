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
      refundOrderCustomItems: [],
      refundOrderItemOrders: [],
      refundOrderTotals: {
        subtotal: 0,
        taxes: 0,
        total: 0
      }
    };
  }

  calculateItemsRefundTotals = () => {
    let items = document.getElementsByClassName('items-subtotal-refund'),
      itemsValues = [];
    for (let i = 0; i < items.length; i += 1) {
      itemsValues.push(+items[i].textContent);
    }
    let taxFree = (+this.state.order.taxes === 0 ) ? true : false,
      subtotal = itemsValues.reduce((total, item) => {
          return (total += item);
        }, 0).toFixed(2),
      taxes = taxFree ? 0 : (subtotal * 0.115).toFixed(2),
      total = (+subtotal + +taxes).toFixed(2);
    return { subtotal: subtotal, taxes: taxes, total: total };
  };

  refundChange = (e) => {
    let target = e.target,
      refundValue = target.valueAsNumber,
      elementId = target.id.split('-'),
      dataModel = elementId[0],
      dataModelId  = elementId[elementId.length-1],
      items = (dataModel === 'ci') ? this.state.customItems : this.state.itemOrders,
      item = items.find((item) => item.id === +dataModelId),
      priceGiven = item.price_given,
      refundSubtotalElement = document.getElementById(`${dataModel}-subtotal-refunded-${dataModelId}`);
    refundSubtotalElement.innerHTML = (priceGiven * refundValue).toFixed(2);
    this.setState({
      refundOrderTotals: this.calculateItemsRefundTotals()
    })
  }

  getNewRefundValue = (elementId) => {
    return document.getElementById(elementId).valueAsNumber
  }

  getSubtotalRefundedValue = (elementId) => {
    return +document.getElementById(elementId).textContent
  }

  getRefundItems = (items, dataModelPrefix) => {
    let refundableType = (dataModelPrefix === 'ci') ? "CustomItem" : "ItemOrder"
    return (
      items.map((val)=>{
        let newRefundValue = this.getNewRefundValue(`${dataModelPrefix}-new-refund-${val.id}`);
        if (newRefundValue > 0) {
          return {
            refundable_id: val.id,
            refundable_type: refundableType,
            quantity_refunded: newRefundValue,
            subtotal_refunded: this.getSubtotalRefundedValue(`${dataModelPrefix}-subtotal-refunded-${val.id}`)
          }
        }
      })
    )

  }

  returnRefundItems = () => {
    let customItems = this.getRefundItems(this.state.customItems, "ci"),
      itemOrders = this.getRefundItems(this.state.itemOrders, "io")
      console.log(customItems.concat(itemOrders));
    return customItems.concat(itemOrders)
  }

  printRefund = () => {
    let csrfToken = document.querySelector("[name='csrf-token']").content,
      order = this.state.order,
      refundOrderTotals = this.state.refundOrderTotals,
      printButton = document.getElementById("print-button");
    console.log('printRef');
    fetch(`/orders/${order.id}/refund_orders`, {
      method: "POST",
      body: JSON.stringify({
        refund_order: {
          subtotal_refunded: refundOrderTotals.subtotal,
          taxes_refunded: refundOrderTotals.taxes,
          total_refunded: refundOrderTotals.total,
          refund_items: this.returnRefundItems()
        }
      }),
      headers: {
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log("response");
        console.log(response);
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then(res => {;
        window.print();
        printButton.disabled = false;
        printButton.innerHTML = "Imprima el Recibo";
        console.log("res");
        console.log(res);
      })
      .catch(error => {
        console.error("error", error);
      });

  }

  render() {
    let order = this.state.order,
      itemOrders = this.state.itemOrders,
      customItems = this.state.customItems,
      refundOrderTotals = this.state.refundOrderTotals,
      refundMax = (itemOrder) => itemOrder.quantity - itemOrder.quantity_refunded;
    console.log(this.state);
    return (
      <div className="refund-order">
        <h1>{order.id}</h1>
        <table>
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
              return (
                <tr key={ind} className="item-order">
                  <td>{ itemOrder.item.brand }</td>
                  <td>{ itemOrder.item.name }</td>
                  <td>{ itemOrder.item.color }</td>
                  <td>{ itemOrder.item.size }</td>
                  <td>{ itemOrder.item.thickness }</td>
                <td id={`io-price-given-${itemOrder.id}`}>{ itemOrder.price_given}</td>
                  <td>{ itemOrder.quantity }</td>

                  <td>{ itemOrder.quantity_refunded }</td>
                  <td>
                    <input
                      id={`io-new-refund-${itemOrder.id}`}
                      type="number" onChange={this.refundChange}
                      min={0} max={refundMax(itemOrder)}
                    />
                  </td>
                  <td id={`io-subtotal-refunded-${itemOrder.id}`}
                    className='items-subtotal-refund'>0</td>
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
                  <td  id={`ci-price-given-${customItem.id}`}>${customItem.price_given}</td>
                  <td>{customItem.quantity} </td>

                  <td>{customItem.quantity_refunded} </td>
                  <td>
                    <input
                      id={`ci-new-refund-${customItem.id}`}
                      type="number" onChange={this.refundChange}
                      min={0} max={refundMax(customItem)}
                    />
                  </td>
                  <td
                    id={`ci-subtotal-refunded-${customItem.id}`}
                    className='items-subtotal-refund'> 0
                  </td>
                  <td>${customItem.subtotal} </td>
                  <td></td>
                </tr>
              )
            })}
            <tr>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              <td>Subtotal</td>
              <td id='refund-order-subtotal'>
                {refundOrderTotals.subtotal}
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              <td>Taxes</td>
              <td id='refund-order-taxes'>
                {refundOrderTotals.taxes}
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              <td>Total</td>
              <td id='refund-order-total'>
                {refundOrderTotals.total}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <button id='print-button' onClick={this.printRefund} >
          Print Refund
        </button>

      </div>
    );
  }
}
