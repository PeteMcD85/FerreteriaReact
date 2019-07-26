import React from 'react'
import ItemTable from './ItemTable'

const ItemsTable = (props) => {
  console.log(props);
  let items = props.items,
      signedIn = props.signedIn,
      addToCart = props.addToCart,
      removeFromCart = props.removeFromCart,
      cart = props.cart,
      checkColumn = (column) => {
        let returnColumn = false;
        items.forEach((val)=>{
          if (val[column]) returnColumn = true
        })
        return returnColumn
      };
  return (
    <div className="table">
    <table>
      <tbody>
        <tr>
          {checkColumn("name") && <th>Nombre</th>}
          {checkColumn("brand") && <th>Marca</th>}
          {checkColumn("size") && <th>Tamaño</th>}
          {checkColumn("thickness") && <th>Grosor</th>}
          {checkColumn("sold_price") && <th>Precio</th>}
          {signedIn && <th>Edit</th>}
          {signedIn && <th>Cantidad</th>}
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
