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
    searchBar = useRef(null),
    { itemsCard, itemsTable } = splitItemsCardsOrTable(displayedItems);

  useEffect(() => {
    console.log(props);
  }, []);

  useEffect(() => {
    console.log(query);
    getQueriedItems(query);
  }, [query]);

  useEffect(() => {
    console.log(displayedItems);
  }, [displayedItems]);

  return (
    <div>
      <input type="text" ref={searchBar} onChange={updateQueryState}></input>
      <div></div>
      <div className="item-cards">
        <ItemsCard displayedItems={itemsCard} />
      </div>
    </div>
  );

  function updateQueryState() {
    setQuery(searchBar.current.value);
  }

  function getQueriedItems(q) {
    // If query is empty
    if (q.length === 0) {
      setDisplayedItems([]);
    } else {
      let words = q.split(" "),
        queriedItems = activeItems.filter(activeItem => {
          let columnValues = getColumnValues(activeItem),
            returnItem = words.every(word => {
              return columnValues.find(val => val.includes(word));
            });
          if (returnItem) return activeItem;
        }); //end of getQueriedItems
      console.log(queriedItems);
      // setDisplayedItems(queriedItems);
    }
  } // end of getQueriedItems()
} // END of Component

// <ItemsTable displayedItems={itemsTable} />;

function getColumnValues(activeItem) {
  let columns = {};
  return columnsToSearch.map(column => downCase(activeItem[column]));
}

function downCase(string) {
  // returns empty string if param is null
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
