import React from 'react'


const ItemTable = (props) => {
  let item = props.item,
      id = item.id,
      brand = item.brand,
      thickness = item.thickness,
      size = item.size,
      sold_price = Number(item.sold_price).toFixed(2),
      bought_price = Number(item.bought_price).toFixed(2),
      active = item.active,
      signedIn = props.signedIn,
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
        console.log(quantityInput);
      },
      setQuantityValue = (id) => {
        console.log(cart);
        let itemInCart = cartItems.find((cartItem)=> cartItem.item.id == id);
        if (itemInCart) return {value: itemInCart.quantity, disabled: true, text: "Remove from Cart" }
        return {value: "", disabled: false, text: "Add to Cart" }
      };
  return (
    <tr>
      <td>{brand}</td>
      <td>{size}</td>
      <td>{thickness}</td>
      <td>{sold_price}</td>
      {signedIn && <td>{bought_price}</td>}
      {signedIn && <td>{String(active)}</td>}
      { signedIn &&
        <td>
          <a href={`/items/${id}/edit`}>Edit</a>
        </td>}
      {signedIn &&
        <td className="update-cart-td">
          <span>Quantity:
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
