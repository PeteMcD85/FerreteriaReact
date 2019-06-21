import React from 'react';

// COMPONENTS
import ItemsCard from './ItemsCard'
import ItemsTable from './ItemsTable'

const Items = (props) => {
  let items = props.items,
      sc = props.selectedCategory,
      signedIn = props.signedIn;
  if (sc !== "PVC") {
    return (
      <div className="item-cards">
       <ItemsCard items={items} signedIn={signedIn} />
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
