import React, { useState, useEffect } from "react";

//
// const paymentOptions = [
//     { text: "Efectivo", value: "cashPayed" },
//     { text: "Tarjeta De Crédito", value: "creditCardPayed" },
//     { text: "Cheque", value: "checkPayed" },
//     { text: "Débito", value: "debitPayed" },
//     { text: "Custom", value: "custom" }
//   ],
//   customMethod = paymentOptions.slice(0, paymentOptions.length - 1),
//   cashMethod = paymentOptions.slice(0, 1),
//   radioInputOptions = {
//     type: "radio",
//     name: "paymentMethod",
//     onChange: setPaymentMethod
//   },

function FormInputs(props) {
  let { inputsArray, inputOptions, id } = props;
  let inputs = inputsArray.map(paymentOption => {
    return {
      paymentOption,
      state: useFormInput(paymentOption.value, inputOptions)
    };
  });
  return (
    <div id={id} className="form-section hide-for-print">
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
  if (inputAttributes.type === "number" || inputAttributes.type === "text")
    inputAttributes["name"] = initialValue;
  // Sets value to 0 when input option is number
  let val =
      inputAttributes.type === "number" || inputAttributes.type === "text"
        ? ""
        : initialValue,
    [value, setValue] = useState(val);

  useEffect(() => {
    // Reference to all inputs with same className
    let param,
      classInputs = [
        ...document.querySelectorAll("." + inputAttributes.className)
      ];
    // IF input type is number
    // if (inputAttributes.type === "number") {
    // Reference to the Sum of all class input values
    // param = getTotalFromInputs(classInputs);
    //   param = { [inputAttributes.id]: value };
    // }
    // IF input type is text
    if (inputAttributes.type === "text" || inputAttributes.type === "number") {
      param = {};
      classInputs.forEach((v, i) => {
        param[v.name] = v.value;
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
      inputValue = type === "checkbox" ? e.target.checked : e.target.value;
    // Updates 'this' input's passed function(setPaymentRecieved)
    // if (type === "checkbox") ;
    if (type === "radio" || type === "checkbox") {
      return inputAttributes.onChange(inputValue);
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
