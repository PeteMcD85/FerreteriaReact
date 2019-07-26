import React from 'react';

// COMPONENTS
import ItemsCard from './ItemsCard'
import ItemsTable from './ItemsTable'

const Items = (props) => {
  let items = props.items,
      selectedNavName = props.selectedNavName,
      signedIn = props.signedIn,
      picUrls = props.picUrls,
      cart = props.cart,
      addToCart = props.addToCart,
      removeFromCart = props.removeFromCart;
  if (selectedNavName !== "PVC" !== "Tinte") {
    return (
      <div className="item-cards">
         <ItemsCard
           items={items}
           signedIn={signedIn}
           picUrls={picUrls}
           addToCart={addToCart}
           removeFromCart={removeFromCart}
           cart={cart}
         />
      </div>
    );
  } else {
    return (
      <div>
        <ItemsTable
          items={items}
          signedIn={signedIn}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cart={cart}
        />
      </div>
    );
  }
}

export default Items
