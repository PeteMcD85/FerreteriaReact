import React, { useState, useRef, useEffect } from "react";
import ItemTable from "./ItemTable";

const ItemsTable = props => {
  let { displayedItems } = props,
    tableHeaderRefs = useRef(null),
    [tableHeadersList, setTableHeadersList] = useState([]),
    columnTranslations = {
      name: "Nombre",
      brand: "Marca",
      size: "Tamaño",
      color: "Color",
      thickness: "Grosor",
      sold_price: "Precio",
      stock_number: "Número De Artículo",
      inventory: "Inventario"
    };
  console.log(displayedItems);
  useEffect(() => {
    console.log(tableHeaderRefs);
    let tableHeaders = [...tableHeaderRefs.current.querySelectorAll("th")]
      .map(th => th.innerText)
      .filter(th => th !== "Editar" && th !== "Cantidad");
    setTableHeadersList(tableHeaders);
  }, [displayedItems]);
  return (
    <div className="table">
      <table>
        <thead ref={tableHeaderRefs}>
          <tr>
            {checkColumn("name") && <th>Nombre</th>}
            {checkColumn("brand") && <th>Marca</th>}
            {checkColumn("size") && <th>Tamaño</th>}
            {checkColumn("color") && <th>Color</th>}
            {checkColumn("thickness") && <th>Grosor</th>}
            {checkColumn("sold_price") && <th>Precio</th>}
            {checkColumn("stock_number") && <th>Número De Artículo</th>}
            {checkColumn("inventory") && <th>Inventario</th>}
            {displayedItems.length > 0 && <th>Editar</th>}
            {displayedItems.length > 0 && <th>Cantidad</th>}
          </tr>
        </thead>
        <tbody>
          {displayedItems.map((item, ind) => {
            return <ItemTable key={item.id} {...{ item, tableHeadersList }} />;
          })}
        </tbody>
      </table>
    </div>
  );
  function checkColumn(column) {
    let returnColumn = false;
    displayedItems.forEach(val => {
      if (val[column] || val[column] === 0) returnColumn = true;
    });
    return returnColumn;
  }
};

export default ItemsTable;
