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

      </div>
    )
}

export default Accountant
