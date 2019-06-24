import React from 'react'

const ItemCard = (props) => {
  let item = props.item,
      id = item.id,
      name = item.name,
      brand = item.brand,
      color = item.color,
      size = item.size,
      thickness = item.thickness,
      price = Number(item.price).toFixed(2),
      active = props.active,
      signedIn = props.signedIn;
  return (
      <div className="item">
        <h2>{name}</h2>
        <p>brand: {brand}</p>
        {color && <p>color: {color}</p>}
        <p>size: {size}</p>
        {thickness && <p>thickness: {thickness}</p>}
        <p>price: ${price}</p>
        <span>
        {signedIn && <p>Active: {active}</p>}
        {signedIn && <a href={`/items/${id}/edit`}>Edit</a>}
        </span>
      </div>
  )
}

export default ItemCard
