import React, { useState } from "react";

function TableRow(props) {
  let { item, setItems } = props,
    {
      id,
      name,
      brand,
      size,
      thickness,
      color,
      inventory,
      bought_price,
      subtotal
    } = item,
    [inventoryValue, setInventoryValue] = useState(0),
    [displayInventoryInput, setDisplayInventoryInput] = useState(false);

  return (
    <tr>
      <td>{name}</td>
      <td>{brand}</td>
      <td>{size}</td>
      <td>{thickness}</td>
      <td>{color}</td>
      <td>
        {inventory}{" "}
        <button
          type="button"
          onClick={() => setDisplayInventoryInput(!displayInventoryInput)}
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
            <button type="button" onClick={() => updateItemInventory(id)}>
              Update
            </button>
          </span>
        )}
      </td>
      <td id="cash">
        $
        {Number(bought_price)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </td>
      <td>
        $
        {Number(subtotal)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </td>
      <td>
        <a href={`/items/${id}/edit`}>Editar</a>
      </td>
      <td>
        <a onClick={() => deleteItem(id)}>Borrar</a>
      </td>
    </tr>
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
          setInventoryValue(0);
          setDisplayInventoryInput(false);
        })
        .catch(error => {
          console.error("error", error);
        });
    }
  }
}

export default TableRow;
