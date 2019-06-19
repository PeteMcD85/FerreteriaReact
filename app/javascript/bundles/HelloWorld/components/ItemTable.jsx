import React from 'react'


const ItemTable = (props) => {
  const deleteItem = (id) => {
    console.log('Delete');
    fetch(`/items/${id}/destroy`, {method: 'DELETE'})
  }
  console.log(props);
  let item = props.item,
      id = item.id,
      brand = item.brand,
      thickness = item.thickness,
      size = item.size,
      price = Number(item.price).toFixed(2),
      active = item.active;
  console.log(item);
  return (
    <tr>
      <td>{brand}</td>
      <td>{size}</td>
      <td>{thickness}</td>
      <td>{price}</td>
      <td>{String(active)}</td>
      <td>
      <a href={`/items/${id}/edit`}>Edit</a>
      </td>
    </tr>

  )
}

export default ItemTable
