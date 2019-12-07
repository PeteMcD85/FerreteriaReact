import React from "react";
import ItemCard from "./ItemCard";

const ItemsCard = props => {
  let items = props.items,
    signedIn = props.signedIn,
    // picUrls = props.picUrls,
    addToCart = props.addToCart,
    removeFromCart = props.removeFromCart,
    itemsStartRange = props.itemsStartRange,
    itemsEndRange = props.itemsEndRange,
    max = items.length,
    cart = props.cart,
    updateItemsRange = props.updateItemsRange,
    disableLess = itemsStartRange === 0 ? true : false,
    disableMore = itemsEndRange >= max ? true : false,
    // getPicUrl = id => picUrls.find(val => val.id === id),
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
        {items.map((item, ind) => {
          if (ind >= itemsStartRange && ind < itemsEndRange) {
            return (
              <ItemCard
                key={ind}
                item={item.id}
                signedIn={signedIn}
                // picUrl={getPicUrl(item.id)}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                cart={cart}
              />
            );
          }
        })}
      </ul>
    </div>
  );
};

export default ItemsCard;
