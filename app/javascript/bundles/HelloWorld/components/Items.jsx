import React from 'react';

// COMPONENTS
import ItemsCard from './ItemsCard'
import ItemsTable from './ItemsTable'

const Items = (props) => {
  let items = props.items,
      sc = props.selectedCategory,
      signedIn = props.signedIn,
      picUrls = props.picUrls;
      console.log(picUrls);
  if (sc !== "PVC") {
    return (
      <div className="item-cards">
       <ItemsCard items={items} signedIn={signedIn} picUrls={picUrls} />
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
