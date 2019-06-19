import React from 'react';
import ItemTable from './ItemTable'

const ItemsTable = (props) => {
  console.log(props);
  let items = props.items;
  return (
    <table>
      <tr>
        <th>Brand</th>
        <th>Size</th>
        <th>Thickness</th>
        <th>Price</th>
        <th>Active</th>
      </tr>
      {items.map((item,ind)=> {
        return <ItemTable key={ind} item={item} />
      })}
    </table>

  );
}

export default ItemsTable
// <table>
//   // <tbody>
//     <tr>
//       <th>Brand</th>
//       <th>Size</th>
//       <th>Thickness</th>
//       <th>Price</th>
//     </tr>
//     // {items.map((item,ind)=> {
//     //   return <ItemTable item={item} />
//     // })}
//   // </tbody>
// </table>
