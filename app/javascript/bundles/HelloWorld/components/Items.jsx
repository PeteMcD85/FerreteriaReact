import React from 'react';

// COMPONENTS
import ItemsCard from './ItemsCard'
import ItemsTable from './ItemsTable'

const Items = (props) => {
  let items = props.items,
      selectedNavName = props.selectedNavName,
      signedIn = props.signedIn,
      picUrls = props.picUrls,
      addItemToOrder = props.addItemToOrder;
  if (selectedNavName !== "PVC") {
    return (
      <div className="item-cards">
       <ItemsCard items={items} signedIn={signedIn} picUrls={picUrls} addItemToOrder={addItemToOrder} />
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
