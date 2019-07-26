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
  if (selectedNavName !== "PVC" && selectedNavName !== "Tornillos" && selectedNavName !== "Tinte" && selectedNavName !== "query") {
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
  } else if (selectedNavName === "query") {
    console.log('query');
      let itemsCard = [],
          itemsTable = [],
          showTable = false;
      items.forEach((item) => {
        if(item.category === "PVC" || item.category === "Tornillos" || item.category === "Tinte") {
          itemsTable.push(item);
        } else {
          itemsCard.push(item);
        }
      });
      if (itemsTable.length > 0) showTable = true;
      return (
          <div>
            { showTable &&
              <div>
                <ItemsTable
                  items={itemsTable}
                  signedIn={signedIn}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  cart={cart}
                />
              </div> }
            <div className="item-cards">
               <ItemsCard
                 items={itemsCard}
                 signedIn={signedIn}
                 picUrls={picUrls}
                 addToCart={addToCart}
                 removeFromCart={removeFromCart}
                 cart={cart}
               />
            </div>
          </div>
      )
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
