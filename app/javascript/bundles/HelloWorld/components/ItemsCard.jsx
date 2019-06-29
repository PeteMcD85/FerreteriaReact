import React from 'react'
import ItemCard from './ItemCard'

const ItemsCard = (props) => {
  let items = props.items,
      signedIn = props.signedIn,
      picUrls = props.picUrls,
      addToCart = props.addToCart,
      removeFromCart = props.removeFromCart,
      getPicUrl = (id) => picUrls.find( (val) => val.id === id);
  return (
      <ul>
        {items.map((item,ind)=>{
          return (
            <ItemCard
              key={ind}
              item={item}
              signedIn={signedIn}
              picUrl={getPicUrl(item.id)}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
             />
          )
  })}
      </ul>
  )
}

export default ItemsCard
