import React from 'react'
import ItemCard from './ItemCard'

const ItemsCard = (props) => {
  let items = props.items,
      signedIn = props.signedIn,
      picUrls = props.picUrls,
      addToCart = props.addToCart,
      removeFromCart = props.removeFromCart,
      itemsStartRange = props.itemsStartRange,
      itemsEndRange = props.itemsEndRange,
      cart = props.cart,
      getPicUrl = (id) => picUrls.find( (val) => val.id === id);
  return (
    <div>
      <div id="range-buttons-div">
        <button classsName="range-buttons"><i class="fa fa-angle-left"></i></button>
        <button classsName="range-buttons"><i class="fa fa-angle-right"></i></button>
      </div>
      <ul>
        {items.map((item,ind)=>{
          if (ind >= itemsStartRange && ind < itemsEndRange ){
            return (
              <ItemCard
                key={ind}
                item={item}
                signedIn={signedIn}
                picUrl={getPicUrl(item.id)}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cart={cart}
               />
            )
          }
        })}
      </ul>
    </div>
  )
}

export default ItemsCard
