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
      removeFromCart = props.removeFromCart,
      itemsStartRange = props.itemsStartRange,
      itemsEndRange = props.itemsEndRange;
  if (selectedNavName !== "PVC" && selectedNavName !== "Tornillos" && selectedNavName !== "Tinte" && selectedNavName !== "query" && selectedNavName !== "Gozne" && selectedNavName !== "Correderas" && selectedNavName !== "Routers" && selectedNavName !== "Tapcon" && selectedNavName !== "Staples" && selectedNavName !== "Laminados" && selectedNavName !== "Sait" && selectedNavName !== "SeamFil" && selectedNavName !== "Clavos" && selectedNavName !== "Discos" && selectedNavName !== "Fregaderos" && selectedNavName !== "Superficie" && selectedNavName !== "Brazos" && selectedNavName !== "Madera" && selectedNavName !== "Tiradores" && selectedNavName !== "Lazy Susan" && selectedNavName !== "Temar") {

    return (
      <div className="item-cards">
         <ItemsCard
           items={items}
           signedIn={signedIn}
           picUrls={picUrls}
           addToCart={addToCart}
           removeFromCart={removeFromCart}
           cart={cart}
           itemsStartRange={itemsStartRange}
           itemsEndRange={itemsEndRange}
         />
      </div>
    );
  } else if (selectedNavName === "query") {
    console.log('query');
      let itemsCard = [],
          itemsTable = [],
          showTable = false;
      items.forEach((item) => {
        if(item.category === "PVC" || item.category === "Tornillos" || item.category === "Tinte" || item.category === "Gozne" || item.category === "Correderas" || item.category === "Routers" || item.category === "Tapcon" || item.category === "Staples" || item.category === "Laminados" || item.brand === "Sait" || item.category === "SeamFil" || item.category === "Clavos" || item.category === "Discos" || item.category === "Superficie" || item.category === "Fregaderos" || item.category === "Temar" || item.category === "Brazos" || item.category === "Tiradores"|| item.category === "Madera" || item.category === "Lazy Susan" ) {
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
                  selectedNavName={selectedNavName}
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
            selectedNavName={selectedNavName}
          />
        </div>
      );
  }
}

export default Items
