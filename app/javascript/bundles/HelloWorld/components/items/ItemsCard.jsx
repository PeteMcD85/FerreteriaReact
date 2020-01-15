import React, { useState } from "react";
import ItemCard from "./ItemCard";

const ItemsCard = props => {
  let { displayedItems } = props,
    max = displayedItems.length,
    [itemsStartRange, setItemsStartRange] = useState(0),
    [itemsEndRange, setItemsEndRange] = useState(10),
    // addToCart = props.addToCart,
    // removeFromCart = props.removeFromCart,
    // updateItemsRange = props.updateItemsRange,
    disableLess = itemsStartRange === 0 ? true : false,
    disableMore = itemsEndRange >= max ? true : false,
    updateRange = e => {
      let direction = e.target.classList.contains("more") ? "more" : "less";
      updateItemsRange(direction);
    };
  return (
    <div>
      <div id="range-buttons-div">
        <button
          id="decrease-range-button"
          className="range-buttons"
          onClick={updateRange}
          disabled={disableLess}
        >
          <i className="fa fa-angle-left"></i>
        </button>
        <button
          id="increase-range-button"
          className="range-buttons more"
          onClick={updateRange}
          disabled={disableMore}
        >
          <i className="fa fa-angle-right more"></i>
        </button>
      </div>
      <ul>
        {displayedItems.map((item, ind) => {
          if (ind >= itemsStartRange && ind < itemsEndRange) {
            return <ItemCard key={item.id} item={item} />;
          }
        })}
      </ul>
    </div>
  );
};

export default ItemsCard;
