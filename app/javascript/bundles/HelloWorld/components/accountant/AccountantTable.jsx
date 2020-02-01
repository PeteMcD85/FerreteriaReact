import React, { useState, useEffect, useRef } from "react";

const AccountantTable = props => {
  let { items, tableCaption, setItems } = props,
    [inventoryValue, setInventoryValue] = useState(0),
    [displayInventoryInput, setDisplayInventoryInput] = useState(false);

  useEffect(() => {
    console.log(inventoryValue);
  }, [inventoryValue]);
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
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.brand}</td>
              <td>{item.size}</td>
              <td>{item.thickness}</td>
              <td>{item.color}</td>
              <td>
                {item.inventory}{" "}
                <button
                  type="button"
                  onClick={() =>
                    setDisplayInventoryInput(!displayInventoryInput)
                  }
                >
                  {!displayInventoryInput ? "Update Inventario" : "Cancel"}
                </button>
                {displayInventoryInput && (
                  <span>
                    <input
                      type="number"
                      defaultValue="0"
                      onChange={e => setInventoryValue(e.target.valueAsNumber)}
                    />
                    <button
                      type="button"
                      onClick={() => updateItemInventory(item.id)}
                    >
                      Update
                    </button>
                  </span>
                )}
              </td>
              <td id="cash">
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

  function deleteItem(itemId) {
    let confirmed = confirm("Are you sure?");
    if (confirmed) {
      fetch(`/items/${itemId}`, {
        method: "delete"
      })
        .then(response => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        .then(result => {
          setItems({
            activeItems: result.active_items,
            inactiveItems: result.inactive_items
          });
        })
        .catch(error => {
          console.error("error", error);
        });
    }
  }
  function updateItemInventory(itemId) {
    let confirmed = confirm("Are you sure?");
    if (confirmed) {
      fetch(`/items/${itemId}?inventory=${inventoryValue}`, {
        method: "PATCH"
      })
        .then(response => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        .then(result => {
          console.log(result);
          setItems({
            activeItems: result.active_items,
            inactiveItems: result.inactive_items
          });
        })
        .catch(error => {
          console.error("error", error);
        });
    }
  }
};

export default AccountantTable;
