import React from 'react';

// COMPONENTS
import ItemsCard from './ItemsCard'
import ItemsTable from './ItemsTable'

const Items = (props) => {
  let items = props.items,
      selectedNavName = props.selectedNavName,
      signedIn = props.signedIn,
      picUrls = props.picUrls,
      addToCart = props.addToCart,
      removeFromCart = props.removeFromCart;
  if (selectedNavName !== "PVC") {
    return (
      <div className="item-cards">
       <ItemsCard
         items={items}
         signedIn={signedIn}
         picUrls={picUrls}
         addToCart={addToCart}
         removeFromCart={removeFromCart}
       />
      </div>
    );
  } else {
    return (
      <div>
        <ItemsTable items={items} signedIn={signedIn} />
      </div>
    );
  }
}

export default Items
