import React from 'react'


const ItemTable = (props) => {
  let item = props.item,
      id = item.id,
      name = item.name,
      brand = item.brand,
      color = item.color,
      thickness = item.thickness,
      size = item.size,
      inventory = item.inventory,
      sold_price = Number(item.sold_price).toFixed(2),
      signedIn = props.signedIn,
      addToCart = props.addToCart,
      removeFromCart = props.removeFromCart,
      cart = props.cart,
      cartItems = cart.cartItems,
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
        }
        cartButton.innerText = `${newCartButtonPretext} from Cart`;
      },
      setQuantityValue = (id) => {
        let itemInCart = cartItems.find((cartItem)=> cartItem.item.id == id);
        if (itemInCart) return {value: itemInCart.quantity, disabled: true, text: "Remove from Cart" }
        return {value: "", disabled: false, text: "Add to Cart" }
      };
  return (
    <tr>
      {name && <td>{name}</td>}
      {brand && <td>{brand}</td>}
      {size && <td>{size}</td>}
      {color && <td>{color}</td>}
      {thickness && <td>{thickness}</td>}
      {signedIn && <td>${sold_price}</td>}
      {signedIn && <td>{inventory}</td>}
      { signedIn &&
        <td>
          <a href={`/items/${id}/edit`}>Edit</a>
        </td>}
      {signedIn &&
        <td className="update-cart-td">
          <span>Cantidad
            <input type="number"
              className="quantity-input"
              id={`quantity-${id}`}
              defaultValue={setQuantityValue(id).value}
              disabled={setQuantityValue(id).disabled}>
            </input>
          </span>
          <button
            className="cart-button"
            id = {`cart-button-${id}`}
            onClick={() => addItem(id)}>
            {setQuantityValue(id).text}
          </button>
        </td>}

    </tr>

  )
}

export default ItemTable
