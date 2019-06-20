import React from 'react';

// COMPONENTS
import ItemsCard from './ItemsCard'
import ItemsTable from './ItemsTable'

// IMAGES
// import Pvc from 'images/pvc.png'

const Items = (props) => {
  let items = props.items,
      sc = props.selectedCategory;
  // console.log('items from items');
  // console.log(items);
  if (sc !== "PVC") {
    return (
      <div className="item-cards">
       <ItemsCard items={items} />
      </div>
    );
  } else {
    return (
      <div>
        <ItemsTable items={items} />
      </div>
    );
  }
}

export default Items
