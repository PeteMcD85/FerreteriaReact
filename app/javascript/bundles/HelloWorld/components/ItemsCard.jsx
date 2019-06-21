import React from 'react'
import ItemCard from './ItemCard'

const ItemsCard = (props) => {
  let items = props.items,
      signedIn = props.signedIn;
  return(
      <ul>
        {items.map((item,ind)=>{
          return <ItemCard key={ind} item={item} signedIn= {signedIn} />
        })}
      </ul>
  )

}

export default ItemsCard
