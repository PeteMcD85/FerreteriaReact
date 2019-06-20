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
      active = props.active;
      console.log(props);
  return (
      <div className="item">
        <h2>{name}</h2>
        <p>brand: {brand}</p>
        {color && <p>color: {color}</p>}
        <p>size: {size}</p>
        {thickness && <p>thickness: {thickness}</p>}
        <p>price: ${price}</p>
        <span>

        <p>Active: {active}</p>
        <a href="#">Edit</a>
        </span>
        </div>
  )
}

export default ItemCard
