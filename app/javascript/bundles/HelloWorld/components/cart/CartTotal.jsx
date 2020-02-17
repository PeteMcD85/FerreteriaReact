import React from "react";

function CartTotal(props) {
  let { name, value, id } = props;
  return (
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{name}</td>
      <td id={id}>
        $
        {Number(value)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </td>
    </tr>
  );
}

export default CartTotal;
