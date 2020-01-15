import React, { useState } from "react";

// COMPONENTS
import Accountant from "../accountant/Accountant";

import Cart from "../cart/Cart";
import CartPaymentMethods from "../cart/CartPaymentMethods";

import ItemsCard from "./ItemsCard";
import ItemsTable from "./ItemsTable";

// VARIABLES

import categoriesBrandsTableDisplayed from "./variables/categoriesBrandsTableDisplayed";

function Items(props) {
  let { activeItems, inactiveItems, signedIn } = props,
    [displayedItems, setDisplayedItems] = useState([]),
    [query, setQuery] = useState(""),
    [queryLength, setQueryLength] = useState(0),
    { itemsCard, itemsTable } = splitItemsCardsOrTable(displayedItems);

  return (
    <div>
      <div></div>
      <div className="item-cards">
        <ItemsCard displayedItems={itemsCard} />
      </div>
    </div>
  );
}

// <ItemsTable displayedItems={itemsTable} />;

function splitItemsCardsOrTable(items) {
  let itemsCard = [],
    itemsTable = [];
  items.forEach(item => {
    categoriesBrandsTableDisplayed.includes(item.category) ||
    item.brand === "Sait"
      ? itemsTable.push(item)
      : itemsCard.push(item);
  });
  return { itemsCard, itemsTable };
}

export default Items;
