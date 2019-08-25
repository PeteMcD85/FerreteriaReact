import React from "react";

const AccountantTable = props => {
  let items = props.items,
    tableCaption = props.tableCaption,
    updateItems = props.updateItems,
    deleteItem = itemId => {
      fetch(`/items/${itemId}`, {
        method: "delete"
      })
        .then(response => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        .then(res => {
          updateItems(res.actives, res.inactives);
        })
        .catch(error => {
          console.error("error", error);
        });
    };

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
        {items.map((item, ind) => {
          return (
            <tr key={ind}>
              <td>{item.name}</td>
              <td>{item.brand}</td>
              <td>{item.size}</td>
              <td>{item.thickness}</td>
              <td>{item.color}</td>
              <td>{item.inventory}</td>
              <td>
                $
                {Number(item.bought_price)
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
              <td>
                $
                {Number(item.subtotal)
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
              <td>
                <a href={`/items/${item.id}/edit`}>Editar</a>
              </td>
              <td>
                <a onClick={() => deleteItem(item.id)}>Borrar</a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AccountantTable;
