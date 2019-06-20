import React from 'react'
import ItemCard from './ItemCard'

const ItemsCard = (props) => {
  let items = props.items;
  return(
      <ul>
        {items.map((item,ind)=>{
          return <ItemCard key={ind} item={item} />
        })}
      </ul>
  )

}

export default ItemsCard
