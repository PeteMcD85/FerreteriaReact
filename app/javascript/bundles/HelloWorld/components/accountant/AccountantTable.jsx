import React, { useState, useEffect, useRef } from "react";

import TableRow from "./TableRow";

const AccountantTable = props => {
  let { items, tableCaption, setItems } = props;

  return (
    <table>
      <caption>{tableCaption}</caption>
      <tbody>
        <tr>
          <th>Nombre</th>
          <th>Marca</th>
          <th>Tamaño</th>
          <th>Grosor</th>
          <th>Color</th>
          <th>Inventario</th>
          <th>Precio</th>
          <th>Total Parcial</th>
          <th>Editar</th>
          <th>Borrar</th>
        </tr>
        {items.map(item => {
          return <TableRow key={item.id} item={item} setItems={setItems} />;
        })}
      </tbody>
    </table>
  );
};

export default AccountantTable;
