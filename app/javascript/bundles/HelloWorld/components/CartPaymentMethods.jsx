import React from "react";

const CartPaymentMethods = props => {
  let updateTaxFree = props.updateTaxFree,
      updatePaymentMethod = props.updatePaymentMethod,
      updateCustomInputChange = props.updateCustomInputChange,
      updateCashRecieved = props.updateCashRecieved,
      customerChange = props.customerChange;
  return (
    <div className="payment-methods">
      <label>
        Libre De Impuestos
        <input
          type="checkbox"
          id="tax-free"
          onChange={updateTaxFree}
        />
      </label>
      <label>
        Efectivo
        <input
          type="radio"
          name="paymentMethod"
          value="cash"
          onChange={updatePaymentMethod}
        />
      </label>
      <label>
        Tarjeta De Crédito
        <input
          type="radio"
          name="paymentMethod"
          value="creditCard"
          onChange={updatePaymentMethod}
        />
      </label>
      <label>
        Cheque
        <input
          type="radio"
          name="paymentMethod"
          value="check"
          onChange={updatePaymentMethod}
        />
      </label>
      <label>
        Débito
        <input
          type="radio"
          name="paymentMethod"
          value="debit"
          onChange={updatePaymentMethod}
        />
      </label>
      <span>
        <label>
          Personalizado
          <input
            type="radio"
            name="paymentMethod"
            value="custom"
            onChange={updatePaymentMethod}
          />
        </label>
        <div id="custom-payment-method-div" className="hidden">
          <div id="custom-payment-method">
            <label>
              Efectivo
              <input
                type="number"
                id="custom-cash"
                onChange={updateCustomInputChange}
              />
            </label>
            <label>
              Tarjeta De Crédito
              <input
                type="number"
                id="custom-credit-card"
                onChange={updateCustomInputChange}
              />
            </label>
            <label>
              Cheque
              <input
                type="number"
                id="custom-check"
                onChange={updateCustomInputChange}
              />
            </label>
            <label>
              Débito
              <input
                type="number"
                id="custom-debit"
                onChange={updateCustomInputChange}
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
              onChange={updateCashRecieved}
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
    </div>
  )
};

export default CartPaymentMethods;
