import React from "react";
import ItemTable from "./ItemTable";

const ItemsTable = props => {
  let items = props.items,
    signedIn = props.signedIn,
    addToCart = props.addToCart,
    removeFromCart = props.removeFromCart,
    cart = props.cart,
    selectedNavName = props.selectedNavName,
    checkColumn = column => {
      let returnColumn = false;
      items.forEach(val => {
        if (val[column]) returnColumn = true;
      });
      if (column === "sold_price" && selectedNavName === "PVC" && !signedIn)
        returnColumn = false;
      return returnColumn;
    };
  return (
    <div className="table">
      <table>
        <tbody>
          <tr>
            {checkColumn("name") && <th>Nombre</th>}
            {checkColumn("brand") && <th>Marca</th>}
            {checkColumn("size") && <th>Tamaño</th>}
            {checkColumn("color") && <th>Color</th>}
            {checkColumn("thickness") && <th>Grosor</th>}
            {checkColumn("sold_price") && <th>Precio</th>}
            {checkColumn("stock_number") && <th>Número De Artículo</th>}
            {signedIn && <th>Inventario</th>}
            {signedIn && <th>Editar</th>}
            {signedIn && <th>Cantidad</th>}
          </tr>
          {items.map((item, ind) => {
            return (
              <ItemTable
                key={ind}
                item={item}
                signedIn={signedIn}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cart={cart}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsTable;
