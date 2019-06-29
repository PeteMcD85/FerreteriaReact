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
      addToCart = props.addToCart,
      removeFromCart = props.removeFromCart,
      addItem = (id) => {
        let quantityInput = document.getElementById(id.toString()),
            quantityValue = +quantityInput.value,
            cartButton = document.getElementById(`${id}${id}`),
            cartButtonPretext = cartButton.innerText.split(" ")[0],
            newCartButtonPretext = (cartButtonPretext === "Add") ? "Remove" : "Add"
        if (!quantityValue || quantityValue < 1) return alert("Must enter quantity to be greater than 0")
        if (cartButtonPretext === "Add") {
          quantityInput.disabled = true;
          addToCart(id,quantityValue);
        } else {
          quantityInput.disabled = false;
          removeFromCart(id);
        }
        cartButton.innerText = `${newCartButtonPretext} from Cart`;
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
                className="cart-button"
                id = {`${id}${id}`}
                onClick={() => addItem(id)}>
                Add to Cart
              </button>
            </div>
          </div>}
      </div>
  )
}

export default ItemCard
