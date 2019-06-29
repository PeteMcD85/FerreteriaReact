import React from 'react'

const ItemCard = (props) => {
  let item = props.item,
      picUrl = props.picUrl.pic_url,
      id = item.id,
      name = item.name,
      brand = item.brand,
      color = item.color,
      size = item.size,
      thickness = item.thickness,
      price = Number(item.price).toFixed(2),
      active = props.active,
      signedIn = props.signedIn,
      isPicUrl = (picUrl !== "") ?  true : false,
      quantity = 0,
      addItemToOrder = props.addItemToOrder,
      addItem = (id) => {
        let quantityValue = +document.getElementById(id.toString()).value;
        if (!quantityValue || quantityValue < 1) return alert("Must enter quantity to be greater than 0")
        addItemToOrder(id,quantityValue)
      };

  return (
      <div className="item">
        {isPicUrl !== ""  && <img className="item-pic" src={picUrl} />}
        <h2>{name}</h2>
        <p>brand: {brand}</p>
        {color && <p>color: {color}</p>}
        <p>size: {size}</p>
        {thickness && <p>thickness: {thickness}</p>}
        <p>price: ${price}</p>
        {signedIn &&
          <div className="active-card">
            <p>Active: {active}</p>
            <a href={`/items/${id}/edit`}>Edit</a>
            <div className="add-item-div">
              <p>Quantity: <input type="number" className="quantity-input" id={id.toString()}></input></p>
              <button
                className="add-item-button"
                onClick={() => addItem(id))}>
                Add Item
              </button>
            </div>
          </div>}
      </div>
  )
}

export default ItemCard
