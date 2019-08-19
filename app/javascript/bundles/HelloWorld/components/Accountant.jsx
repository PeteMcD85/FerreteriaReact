import React from "react";

const Accountant = props => {
  let activeItems = props.activeItems,
    updateItems = props.updateItems,
    items = activeItems.map((activeItem, ind) => {
      let boughtPrice = activeItem.bought_price ? activeItem.bought_price : 1;
      activeItem.bought_price = boughtPrice;
      activeItem.subtotal = (+activeItem.inventory * +boughtPrice).toFixed(2);
      return activeItem;
    }),
    itemsTotal = items.reduce((total, item) => {
      return total + +item.subtotal;
    }, 0),
    deleteItem = itemId => {
      fetch(`/items/${itemId}`, {
        method: "delete"
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
          console.log("working");
          console.log(res);
          updateItems(res.actives, res.inactives);
        })
        .catch(error => {
          console.error("error", error);
        });
    };
  console.log(items);
  console.log(itemsTotal);
  return (
    <div>
      <p>
        {" "}
        Total: $
        {itemsTotal
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
      </p>
      <table>
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
    </div>
  );
};

export default Accountant;
