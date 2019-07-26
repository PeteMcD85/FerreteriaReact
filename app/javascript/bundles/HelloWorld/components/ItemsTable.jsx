import React from 'react'
import ItemTable from './ItemTable'

const ItemsTable = (props) => {
  let items = props.items,
      signedIn = props.signedIn,
      addToCart = props.addToCart,
      removeFromCart = props.removeFromCart,
      cart = props.cart,
      category = props.category,
      checkColumn = (column) => {
        let returnColumn = false;
          items.forEach((val)=>{
            if (val[column]) returnColumn = true
            if (val[column] === "") returnColumn = false
          })
          return returnColumn
        };
  return (
  <div className="table">
    <table>
      <tbody>
        <tr>
          {checkColumn('name') && <th>Name</th>}
          {checkColumn('brand') && <th>Brand</th>}
          {checkColumn('size') && <th>Size</th>}
          {checkColumn('thickness') && <th>Thickness</th>}
          {checkColumn('color') && <th>Color</th>}
          {checkColumn('sold_price') && <th>Price</th>}
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
              category={category}
            />)
        })}
      </tbody>
    </table>
  </div>
 );
}

export default ItemsTable
