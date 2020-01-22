import React, { useState, useEffect } from "react";

function FormInputs(props) {
  let { inputsArray, inputOptions } = props;
  let inputs = inputsArray.map(paymentOption => {
    return {
      paymentOption,
      state: useFormInput(paymentOption.value, inputOptions)
    };
  });
  return (
    <div className="form-section">
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
    // Reference to all inputs with same className
    let param = {},
      classInputs = [
        ...document.querySelectorAll("." + inputAttributes.className)
      ];
    // IF input type is number
    if (inputAttributes.type === "number") {
      // Reference to the Sum of all class input values
      param = getTotalFromInputs(classInputs);
    }
    // IF input type is text
    if (inputAttributes.type === "text") {
      console.log(classInputs);
      classInputs.forEach((v, i) => {
        param[v.labels[0].innerText] = v.value;
      });
    }
    // Updates Parents State
    inputAttributes.onChange(param);
  }, [value]);
  // returns all inputAttributes for 'this' input
  return {
    ...inputAttributes,
    defaultValue: value,
    onChange: handleChange
  };

  function handleChange(e) {
    e.persist();
    console.log(e);
    // Reference of 'this' input's value
    let type = inputAttributes.type,
      inputValue = (type = "checkbox") ? e.target.checked : e.target.value;
    console.log(type);
    console.log(inputValue);
    // Updates 'this' input's passed function(setPaymentRecieved)
    if (type === "radio" || type === "checkbox") {
      inputAttributes.onChange(inputValue);
    }
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
