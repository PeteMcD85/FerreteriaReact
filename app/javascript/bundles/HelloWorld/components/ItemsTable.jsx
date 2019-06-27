import React from 'react'
import ItemTable from './ItemTable'

const ItemsTable = (props) => {
  console.log(props);
  let items = props.items,
      signedIn = props.signedIn;
  return (
    <table>
      <tbody>
        <tr>
          <th>Brand</th>
          <th>Size</th>
          <th>Thickness</th>
          <th>Price</th>
          { signedIn &&
            <th>Active</th>
          }

        </tr>
        {items.map((item,ind)=> {
          return <ItemTable key={ind} item={item} signedIn={signedIn} />
        })}
      </tbody>
    </table>

  );
}

export default ItemsTable
