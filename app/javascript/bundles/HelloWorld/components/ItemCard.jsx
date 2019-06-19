import React from 'react'

const ItemCard = (props) => {
  let id = props.id,
      name = props.name,
      brand = props.brand,
      color = props.color,
      size = props.size,
      thickness = props.thickness,
      price = Number(props.price).toFixed(2),
      image = props.image,
      active = props.active;
      console.log(props);
  return (
    <div className="item">
      {image && <img src={image} alt={name}/>}
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
