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
      },0);
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
            </tr>
          { items.map((item) => {
            return (
              <tr>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.size}</td>
                <td>{item.thickness}</td>
                <td>{item.color}</td>
                <td>{item.inventory}</td>
                <td>{item.bought_price}</td>
                <td>{item.subtotal}</td>
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
