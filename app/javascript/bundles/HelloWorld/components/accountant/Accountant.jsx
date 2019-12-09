import React from "react";
import AccountantTable from "./AccountantTable";

const Accountant = props => {
  let activeItems = props.activeItems,
    inactiveItems = props.inactiveItems,
    updateItems = props.updateItems,
    addBoughtPriceInventory = itemsArray => {
      return itemsArray.map((item, ind) => {
        let boughtPrice = item.bought_price ? item.bought_price : 0,
          inventory = item.inventory ? item.inventory : 0;
        item.bought_price = boughtPrice;
        item.inventory = inventory;
        item.subtotal = (+item.inventory * +boughtPrice).toFixed(2);
        return item;
      });
    },
    actItems = addBoughtPriceInventory(activeItems),
    inactItems = addBoughtPriceInventory(inactiveItems),
    itemsTotal = actItems.reduce((total, item) => total + +item.subtotal, 0);

  return (
    <div>
      <p id="accountant-total">
        {" "}
        Total: $
        {itemsTotal
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
      </p>
      <AccountantTable
        items={actItems}
        tableCaption="Artículos Activados"
        updateItems={updateItems}
      />
      <AccountantTable
        items={inactItems}
        tableCaption="Artículos Inactivos"
        updateItems={updateItems}
      />
    </div>
  );
};

export default Accountant;
