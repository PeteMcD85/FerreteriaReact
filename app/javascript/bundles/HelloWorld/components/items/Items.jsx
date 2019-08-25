import React from "react";

// COMPONENTS
import ItemsCard from "./ItemsCard";
import ItemsTable from "./ItemsTable";

const Items = props => {
  let items = props.items,
    selectedNavName = props.selectedNavName,
    signedIn = props.signedIn,
    picUrls = props.picUrls,
    cart = props.cart,
    addToCart = props.addToCart,
    removeFromCart = props.removeFromCart,
    itemsStartRange = props.itemsStartRange,
    itemsEndRange = props.itemsEndRange,
    updateItemsRange = props.updateItemsRange,
    categoryBrandTurnedTable = ["PVC", "Tornillos", "Tinte", "query",
     "Gozne", "Correderas", "Routers", "Tapcon", "Staples", "Laminados", "Sait",
      "SeamFil", "Clavos", "Discos", "Fregaderos", "Superficie", "Brazos",
    "Madera", "Tiradores", "Lazy Susan", "Temar"];

  if ( !categoryBrandTurnedTable.includes(selectedNavName) ) {
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
          updateItemsRange={updateItemsRange}
        />
      </div>
    );
  } else if (selectedNavName === "query") {
    console.log("query");
    let itemsCard = [],
      itemsTable = [],
      showTable = false;
    items.forEach(item => {
      if (categoryBrandTurnedTable.includes(item.category) || item.brand === "Sait") {
        itemsTable.push(item);
      } else {
        itemsCard.push(item);
      }
    });
    if (itemsTable.length > 0) showTable = true;
    return (
      <div>
        {showTable && (
          <div>
            <ItemsTable
              items={itemsTable}
              signedIn={signedIn}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cart={cart}
              selectedNavName={selectedNavName}
            />
          </div>
        )}
        <div className="item-cards">
          <ItemsCard
            items={itemsCard}
            signedIn={signedIn}
            picUrls={picUrls}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cart={cart}
            itemsStartRange={itemsStartRange}
            itemsEndRange={itemsEndRange}
            updateItemsRange={updateItemsRange}
          />
        </div>
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
          selectedNavName={selectedNavName}
        />
      </div>
    );
  }
};

export default Items;
