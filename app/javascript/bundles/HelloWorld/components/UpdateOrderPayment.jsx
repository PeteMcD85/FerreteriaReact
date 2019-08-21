import React from "react";
import PropTypes from "prop-types";

export default class UpdateOrderPayment extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    let order = props.order,
        paymentMethod = "";
    switch (order.total) {
      case order.cash_payed:
        paymentMethod = "cash"
        break;
      case order.check_payed:
        paymentMethod = "check"
        break;
      case order.debit_payed:
        paymentMethod = "debit"
        break;
      default:
        paymentMethod = "custom"
      }
    this.state = {
      order: order,
      paymentMethod: paymentMethod,
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
    let orderTotal = this.state.order.total,
      val = e.target.value,
      customerChange = (+val - +orderTotal).toFixed(2);
    console.log(val);
    console.log(orderTotal);
    this.setState({ customerChange: customerChange });
  };

  updateCustomInputChange = () => {
    let cashAmount = document.getElementById("custom-cash").value,
      creditCardAmount = document.getElementById("custom-credit-card").value,
      checkAmount = document.getElementById("custom-check").value,
      debitAmount = document.getElementById("custom-debit").value,
      orderTotal = this.state.order.total,
      customTotal = (
        +cashAmount +
        +creditCardAmount +
        +checkAmount +
        +debitAmount
      ).toFixed(2),
      customerChange = (+customTotal - +orderTotal).toFixed(2);
    console.log("update");
    this.setState({
      customTotal: customTotal,
      customerChange: customerChange
    });
  };

  updateOrderPayment = () => {
    let csrfToken = document.querySelector("[name='csrf-token']").content,
        id = this.state.order.id,
        paymentMethod = this.state.paymentMethod,
        orderTotal = this.state.order.total,
        customMethod = {
          cash: 0,
          creditCard: 0,
          check: 0,
          debit: 0
        };
    if (paymentMethod === "") return alert("Debe elegir el método de pago");
    if (paymentMethod === "custom") {
      let cashAmount = +document.getElementById("custom-cash").value,
        creditCardAmount = +document.getElementById("custom-credit-card").value,
        checkAmount = +document.getElementById("custom-check").value,
        debitAmount = +document.getElementById("custom-debit").value,
        customTotal = (
          cashAmount +
          creditCardAmount +
          checkAmount +
          debitAmount
        ).toFixed(2);
      if (+orderTotal > +customTotal) {
        return alert(`${customTotal}:Debe ser mayor que ${orderTotal}`);
      } else {
        if (customTotal > orderTotal) {
          let difference = customTotal - orderTotal;
              cashAmount -= difference
          if (cashAmount < 0) return alert('Please Review')
        }
        customMethod.cash = cashAmount.toFixed(2);
        customMethod.creditCard = creditCardAmount.toFixed(2);
        customMethod.check = checkAmount.toFixed(2);
        customMethod.debit = debitAmount.toFixed(2);
      }
    } else {
      if (paymentMethod === "cash") {
        let customerChange = this.state.customerChange,
          cashRecieved = document.getElementById("cash-recieved").value;
        if (+customerChange < 0 || +cashRecieved < +orderTotal)
          return alert(`Efectivo Recibido debe ser mayor que ${orderTotal}`);
      }
      customMethod[paymentMethod] = orderTotal;
    }
    fetch(`/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        order: {
          cash_payed: customMethod.cash,
          credit_card_payed: customMethod.creditCard,
          debit_payed: customMethod.debit,
          check_payed: customMethod.check
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
      .then(res => {
        console.log('working');
        console.log(res);
        window.location.href = res.url

      })
      .catch(error => {
        console.error("error", error);
      });
 }
  render(){
    let customerChange = this.state.customerChange,
        customTotal = this.state.customTotal,
        paymentMethod = this.state.paymentMethod,
        defaultChecked = (radioValue) => {
          return (radioValue === paymentMethod) ? true : false;
        };
    return (
      <div className="payment-methods">
        <label>
          Efectivo
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            onChange={this.updatePaymentMethod}
            defaultChecked={defaultChecked('cash')}
          />
        </label>
        <label>
          Tarjeta De Crédito
          <input
            type="radio"
            name="paymentMethod"
            value="creditCard"
            onChange={this.updatePaymentMethod}
            defaultChecked={defaultChecked('creditCard')}
          />
        </label>
        <label>
          Cheque
          <input
            type="radio"
            name="paymentMethod"
            value="check"
            onChange={this.updatePaymentMethod}
            defaultChecked={defaultChecked('check')}
          />
        </label>
        <label>
          Débito
          <input
            type="radio"
            name="paymentMethod"
            value="debit"
            onChange={this.updatePaymentMethod}
            defaultChecked={defaultChecked('debit')}
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
              defaultChecked={defaultChecked('custom')}
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
          <button onClick={this.updateOrderPayment}>Update</button>
        </div>
      </div>
    )
  }
}
