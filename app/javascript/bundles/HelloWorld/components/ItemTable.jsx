import React from 'react'


const ItemTable = (props) => {
  let item = props.item,
      id = item.id,
      brand = item.brand,
      thickness = item.thickness,
      size = item.size,
      price = Number(item.price).toFixed(2),
      active = item.active,
      signedIn = props.signedIn;
  return (
    <tr>
      <td>{brand}</td>
      <td>{size}</td>
      <td>{thickness}</td>
      <td>{price}</td>
      {signedIn && <td>{String(active)}</td>}
      { signedIn &&
        <td>
          <a href={`/items/${id}/edit`}>Edit</a>
        </td>
      }

    </tr>

  )
}

export default ItemTable
