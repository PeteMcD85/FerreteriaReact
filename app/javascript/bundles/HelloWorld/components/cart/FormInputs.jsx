import React, { useState, useEffect } from "react";

function FormInputs(props) {
  let { inputsArray, inputOptions } = props;
  console.log(inputsArray);
  let inputs = inputsArray.map(paymentOption => {
    return {
      paymentOption,
      state: useFormInput(paymentOption.value, inputOptions)
    };
  });
  return (
    <div className="payment-methods">
      {inputs.map((state, ind) => {
        return (
          <label key={state.paymentOption.text + ind.toString()}>
            {state.paymentOption.text}
            <input {...state.state} />
          </label>
        );
      })}
    </div>
  );
} // end of component;

function useFormInput(initialValue, inputAttributes) {
  // Sets value to 0 when input option is number
  let val = inputAttributes.type === "number" ? 0 : initialValue,
    [value, setValue] = useState(val);
  useEffect(() => {
    // IF 'this' inputs type is number
    if (inputAttributes.type === "number") {
      // Reference to the Sum of all input values with same className
      let total = getTotalFromInputs([
        ...document.querySelectorAll("." + inputAttributes.className)
      ]);
      // Updates Parents State
      inputAttributes.onChange(total);
    }
  }, [value]);
  // returns all inputAttributes for 'this' input
  return {
    ...inputAttributes,
    defaultValue: value,
    onChange: handleChange
  };

  function handleChange(e) {
    // Reference of 'this' input's value
    let inputValue = e.target.value;
    // Updates 'this' input's passed function(setPaymentRecieved)
    if (inputAttributes.type === "radio") inputAttributes.onChange(inputValue);
    //Sets Value to 'this' input's value
    setValue(inputValue);
  }

  function getTotalFromInputs(arrayOfInputs) {
    // Returns the TOTAL of all input values passed through parameter
    return arrayOfInputs.reduce((t, v) => {
      return t + v.valueAsNumber;
    }, 0);
  }
} // end of useFormInput()

export default FormInputs;
