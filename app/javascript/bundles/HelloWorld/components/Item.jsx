import React from 'react'

const Item = (props) => {
  let name = props.name,
      brand = props.brand,
      color = props.color,
      size = props.size,
      thickness = props.thickness,
      price = Number(props.price).toFixed(2),
      image = props.image;
      console.log(image);
  return (
    <div>
      {image && <img src={image} alt={name}/>}
      <h2>{name}</h2>
      <p>brand: {brand}</p>
      {color && <p>color: {color}</p>}
      <p>size: {size}</p>
      {thickness && <p>thickness: {thickness}</p>}
      <p>price: ${price}</p>
    </div>
  )
}

export default Item
