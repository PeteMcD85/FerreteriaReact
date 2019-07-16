import React from 'react'
import ItemTable from './ItemTable'

const ItemsTable = (props) => {
  console.log(props);
  let items = props.items,
      signedIn = props.signedIn,
      addToCart = props.addToCart,
      removeFromCart = props.removeFromCart,
      cart = props.cart;
  return (
    <div className="pvc-table">
    <table>
      <tbody>
        <tr>
          <th>Brand</th>
          <th>Size</th>
          <th>Thickness</th>
          {signedIn && <th>Price</th>}
          {signedIn && <th>CompanyPrice</th>}
          {signedIn && <th>Active</th>}
          {signedIn && <th>Edit</th>}
          {signedIn && <th>Amount</th>}
        </tr>
        {items.map((item,ind)=> {
          return (
            <ItemTable
              key={ind}
              item={item}
              signedIn={signedIn}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cart={cart}
            />)
        })}
      </tbody>
    </table>
    </div>

  );
}

export default ItemsTable
