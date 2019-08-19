import React from "react";
import PropTypes from "prop-types";

export default class UpdateOrderPayment extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      order: props.order,
      paymentMethod: "",
      customTotal: 0,
      customerChange: 0

    };
    console.log(this.state);
  }

  updatePaymentMethod = e => {
    let val = e.target.value,
      customPayment = document.getElementById("custom-payment-method-div"),
      cashPayment = document.getElementById("cash-payment-method");
    document.getElementById("custom-cash").value = 0;
    document.getElementById("custom-credit-card").value = 0;
    document.getElementById("custom-check").value = 0;
    document.getElementById("custom-debit").value = 0;
    document.getElementById("cash-recieved").value = 0;
    console.log(val);
    if (val === "custom") {
      customPayment.classList.remove("hidden");
      cashPayment.classList.add("hidden");
    } else if (val === "cash") {
      customPayment.classList.add("hidden");
      cashPayment.classList.remove("hidden");
    } else {
      customPayment.classList.add("hidden");
      cashPayment.classList.add("hidden");
    }
    this.setState({
      paymentMethod: val,
      customTotal: 0,
      customerChange: 0
    });
  };

  updateCashRecieved = e => {
    let cartTotal = this.state.cart.cartTotal.total,
      val = e.target.value,
      customerChange = (+val - +cartTotal).toFixed(2);
    console.log(val);
    console.log(cartTotal);
    this.setState({ customerChange: customerChange });
  };

  updateCustomInputChange = () => {
    let cashAmount = document.getElementById("custom-cash").value,
      creditCardAmount = document.getElementById("custom-credit-card").value,
      checkAmount = document.getElementById("custom-check").value,
      debitAmount = document.getElementById("custom-debit").value,
      cartTotal = this.state.cart.cartTotal.total,
      customTotal = (
        +cashAmount +
        +creditCardAmount +
        +checkAmount +
        +debitAmount
      ).toFixed(2),
      customerChange = (+customTotal - +cartTotal).toFixed(2);
    console.log("update");
    this.setState({
      customTotal: customTotal,
      customerChange: customerChange
    });
  };

  updatePaymentMethod = () => {
    let csrfToken = document.querySelector("[name='csrf-token']").content,
        id = this.state.order.id,
        customMethod = {
          cash: 0,
          creditCard: 0,
          check: 0,
          debit: 0
        };
    fetch(`/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        order: {
          orderType: "sale",
          cashPayed: customMethod.cash,
          creditCardPayed: customMethod.creditCard,
          debitPayed: customMethod.debit,
          checkPayed: customMethod.check
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
        return response;
      })
      .then(res => {
        console.log('working');
      })
      .catch(error => {
        console.error("error", error);
      });
 }
  render(){
    let customerChange = this.state.customerChange,
        customTotal = this.state.customTotal;
    return (
      <div className="payment-methods">
        <label>
          Efectivo
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            onChange={this.updatePaymentMethod}
          />
        </label>
        <label>
          Tarjeta De Crédito
          <input
            type="radio"
            name="paymentMethod"
            value="creditCard"
            onChange={this.updatePaymentMethod}
          />
        </label>
        <label>
          Cheque
          <input
            type="radio"
            name="paymentMethod"
            value="check"
            onChange={this.updatePaymentMethod}
          />
        </label>
        <label>
          Débito
          <input
            type="radio"
            name="paymentMethod"
            value="debit"
            onChange={this.updatePaymentMethod}
          />
        </label>
        <span>
          <label>
            Personalizado
            <input
              type="radio"
              name="paymentMethod"
              value="custom"
              onChange={this.updatePaymentMethod}
            />
          </label>
          <div id="custom-payment-method-div" className="hidden">
            <div id="custom-payment-method">
              <label>
                Efectivo
                <input
                  type="number"
                  id="custom-cash"
                  onChange={this.updateCustomInputChange}
                />
              </label>
              <label>
                Tarjeta De Crédito
                <input
                  type="number"
                  id="custom-credit-card"
                  onChange={this.updateCustomInputChange}
                />
              </label>
              <label>
                Cheque
                <input
                  type="number"
                  id="custom-check"
                  onChange={this.updateCustomInputChange}
                />
              </label>
              <label>
                Débito
                <input
                  type="number"
                  id="custom-debit"
                  onChange={this.updateCustomInputChange}
                />
              </label>
            </div>
            <div id="custom-change">
              {`${
                customerChange < 0 ? "Falta" : "Cambio de Cliente"
              } : $${Math.abs(customerChange)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
            </div>
          </div>
          <div id="cash-payment-method" className="hidden">
            <label>
              Efectivo Recibido
              <input
                type="number"
                id="cash-recieved"
                onChange={this.updateCashRecieved}
              />
            </label>
            <span>
              {" "}
              {`${
                customerChange < 0 ? "Falta" : "Cambio de Cliente"
              } : $${Math.abs(customerChange)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
            </span>
          </div>
        </span>
        <div>
          <button onClick={this.updatePaymentMethod}></button>
        </div>
      </div>
    )
  }
}
