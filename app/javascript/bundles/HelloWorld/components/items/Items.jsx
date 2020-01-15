import React, { useState, useEffect, useRef } from "react";

// COMPONENTS
import Accountant from "../accountant/Accountant";

import Cart from "../cart/Cart";
import CartPaymentMethods from "../cart/CartPaymentMethods";

import ItemsCard from "./ItemsCard";
import ItemsTable from "./ItemsTable";

// VARIABLES

import tableDisplayedCategories from "./variables/tableDisplayedCategories";
import columnsToSearch from "./variables/columnsToSearch";

function Items(props) {
  let { activeItems, inactiveItems, signedIn } = props,
    [displayedItems, setDisplayedItems] = useState([]),
    [query, setQuery] = useState(""),
    searchBar = useRef(null);

  useEffect(() => {
    let { itemsCard, itemsTable } = splitItemsCardsOrTable(displayedItems);
    console.log(props);
  }, []);

  useEffect(() => {
    console.log(query);
    setDisplayedItems(getQueriedItems(query));
  }, [query]);

  useEffect(() => {
    console.log(displayedItems);
  }, [displayedItems]);

  return (
    <div>
      <input type="text" ref={searchBar} onChange={updateQueryState}></input>
      <div></div>
      <div className="item-cards"></div>
    </div>
  );

  function updateQueryState() {
    setQuery(searchBar.current.value);
  }

  function getQueriedItems(q) {
    return filterItemsFromQuery(q.trim(), activeItems);
  } // end of getQueriedItems()
} // END of Component
// <ItemsCard displayedItems={itemsCard} />
// <ItemsTable displayedItems={itemsTable} />;

function filterItemsFromQuery(query, items) {
  if (query === "") return [];
  let words = query.split(" ");
  // Returns a list of items to be displayed in view(displayedItems)
  return items.filter(item => {
    // an array of all items property values to be compared to the query
    let values = getColumnValues(item);
    // Adds Item to displayedItems if item's values contains all words from query
    if (words.every(w => values.find(v => v.includes(w)))) return item;
  });
}

function getColumnValues(item) {
  // An Array of all item's desired column's value('{name}', '{brand}', etc...)
  return columnsToSearch.map(column => downCase(item[column]));
}

function downCase(string) {
  // returns lowerCase string or empty string if value is null
  return string ? string.toLowerCase() : "";
}

function splitItemsCardsOrTable(items) {
  let itemsCard = [],
    itemsTable = [];
  items.forEach(item => {
    tableDisplayedCategories.includes(item.category) || item.brand === "Sait"
      ? itemsTable.push(item)
      : itemsCard.push(item);
  });
  return { itemsCard, itemsTable };
}

export default Items;
