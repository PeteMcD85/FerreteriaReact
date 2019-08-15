import React from 'react';

const Accountant = (props) => {
  let activeItems = props.activeItems,
      items = activeItems.map((activeItem,ind)=>{
        let boughtPrice = activeItem.bought_price ? activeItem.bought_price : 1;
        activeItem.bought_price = boughtPrice;
        activeItem.subtotal = (+activeItem.inventory * +boughtPrice).toFixed(2);
        return activeItem
      }),
      itemsTotal = items.reduce((total, item)=>{
        return (total + +item.subtotal)
      },0),
      deleteItem = (itemId) => {
        fetch(
          `/items/${itemId}`, {
            method: "DELETE",
          }).then(response => {
            console.log('response');
            console.log(response);
            if (!response.ok) { throw response; }
            return response;
          }).then((res) => {
            console.log('working');
            console.log(res);
          }).catch(error => {
            console.error("error", error);
          });
      };


      console.log(items);
    return (
      <div>
        {itemsTotal.toFixed(2)}
        <table>
          <tbody>
            <tr>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Tamaño</th>
              <th>Grosor</th>
              <th>Color</th>
              <th>Inventario</th>
              <th>Precio</th>
              <th>subtotal</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          { items.map((item,ind) => {
            return (
              <tr key={ind}>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.size}</td>
                <td>{item.thickness}</td>
                <td>{item.color}</td>
                <td>{item.inventory}</td>
                <td>{item.bought_price}</td>
                <td>{item.subtotal}</td>
                <td><a href={`/items/${item.id}/edit`}>Edit</a></td>
                <td><a onClick={()=> deleteItem(item.id)}> Delete</a></td>
              </tr>
            )
          })

          }
          </tbody>
        </table>
      </div>
    )
}

export default Accountant
