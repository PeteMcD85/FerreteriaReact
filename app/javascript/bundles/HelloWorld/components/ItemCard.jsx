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
      sold_price = Number(item.sold_price).toFixed(2),
      signedIn = props.signedIn,
      isPicUrl = (picUrl !== "") ?  true : false,
      addToCart = props.addToCart,
      removeFromCart = props.removeFromCart,
      cart = props.cart,
      addItem = (id) => {
        let quantityInput = document.getElementById(`quantity-${id}`),
            quantityValue = +quantityInput.value,
            cartButton = document.getElementById(`cart-button-${id}`),
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
      },
      setQuantityValue = (id) => {
        let itemInCart = cart.cartItems.find((cartItem)=> cartItem.item.id == id);

        if (itemInCart) return {value: itemInCart.quantity, disabled: true, text: "Remove from Cart" }
        return {value: "", disabled: false, text: "Add to Cart" }
      };
      // console.log(cart);
  return (
      <div className="item">
        {isPicUrl !== ""  && <img className="item-pic" src={picUrl} />}
        {name && <h2>{name}</h2>}
        {brand && <p>{brand}</p>}
        {color && <p>{color}</p>}
        {size && <p>{size}</p>}
        {thickness && <p>{thickness}</p>}
        <h4>price: ${sold_price}</h4>
        {signedIn &&
          <div className="active-card">
            <a href={`/items/${id}/edit`}>Edit</a>
            <div className="update-cart-div">
              <h4>Quantity
                <input type="number"
                  className="quantity-input"
                  id={`quantity-${id}`}
                  defaultValue={setQuantityValue(id).value}
                  disabled={setQuantityValue(id).disabled}>
                </input>
              </h4>
              <button
                className="cart-button"
                id = {`cart-button-${id}`}
                onClick={() => addItem(id)}>
                {setQuantityValue(id).text}
              </button>
            </div>
          </div>
        }
      </div>
  )
}

export default ItemCard
