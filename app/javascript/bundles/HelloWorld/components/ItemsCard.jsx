import React from 'react'
import ItemCard from './ItemCard'

const ItemsCard = (props) => {
  let items = props.items,
      signedIn = props.signedIn,
      picUrls = props.picUrls,
      addItemToOrder = props.addItemToOrder,
      getPicUrl = (id) => picUrls.find( (val) => val.id === id);
  return (
      <ul>
        {items.map((item,ind)=>{
          return <ItemCard key={ind} item={item} signedIn={signedIn} picUrl={getPicUrl(item.id)} addItemToOrder={addItemToOrder} />
        })}
      </ul>
  )
}

export default ItemsCard
