import React, { useState, useRef, useEffect, useContext } from "react";

// +++++++++ CONTEXTS +++++++++
import CartContext from "../contexts/CartContext";

// +++++++++ COMPONENTS +++++++++
import CartMain from "../cart/CartMain";
import ItemsCard from "./ItemsCard";
import ItemsTable from "./ItemsTable";

// +++++++++++ VARIABLES +++++++++++
// Array of categories/brands to be displayed in tables rather than cards
import tableDisplayedCategories from "./variables/tableDisplayedCategories";

// Array of column names for searchBar to compare to items
import columnsToSearch from "./variables/columnsToSearch";

function Items(props) {
  let { activeItems, inactiveItems, signedIn } = props,
    [displayedItems, setDisplayedItems] = useState([]),
    [query, setQuery] = useState(""),
    [cartItems, setCartItems] = useState([]),
    [showCart, setShowCart] = useState(true),
    { itemsCard, itemsTable } = splitItemsCardsOrTable(displayedItems);

  useEffect(() => {
    setDisplayedItems(filterItemsFromQuery(query, activeItems));
  }, [query]);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateCartItem }}
    >
      <div>
        {showCart && <CartMain />}
        {!showCart && (
          <div>
            <input
              type="text"
              onChange={e => setQuery(e.target.value.trim())}
            ></input>
            <div></div>
            <div className="item-cards">
              <ItemsCard displayedItems={itemsCard} />
            </div>
          </div>
        )}
      </div>
    </CartContext.Provider>
  );

  function addToCart(item, quantity) {
    // Adds Item to CartItems Array
    console.log(item);
    setCartItems([
      ...cartItems,
      {
        item: item,
        quantity: quantity,
        priceGiven: item.sold_price,
        subtotal: (quantity * item.sold_price).toFixed(2)
      }
    ]);
  }

  function removeFromCart(id) {
    // Removes all cart items if 'all' is passed as argument
    if (id === "all") return setCartItems([]);
    // Finds index for item to be removed from cartItems Array
    let indexToRemove = cartItems.findIndex(cartItem => cartItem.item.id == id);
    // Removes cartItem from cartItems Array
    setCartItems(cartItems.filter((v, i) => i !== indexToRemove));
  }

  function updateCartItem(id, priceGiven, quantity) {
    console.log("update");
    let ci = cartItems.slice(),
      indexToUpdate = ci.findIndex(cartItem => cartItem.item.id == id),
      cartItem = cartItems[indexToUpdate];
    cartItem.priceGiven = priceGiven;
    cartItem.quantity = quantity;
    cartItem.subtotal = (cartItem.priceGiven * cartItem.quantity).toFixed(2);
    ci[indexToUpdate] = cartItem;
    setCartItems(ci);
  }
} // END of Component

// <ItemsTable displayedItems={itemsTable} />;

function filterItemsFromQuery(query, items) {
  // Returns an empty array if query is empty
  if (query === "") return [];
  // Splits query into words
  let words = query.split(" ");
  // Returns a list of items to be displayed in view(displayedItems)
  return items.filter(item => {
    // An array of all items property values to be compared to the query
    let values = getColumnValues(item);
    // Adds Item to displayedItems if the item's values contains all words from query
    if (words.every(w => values.find(v => v.includes(w)))) return item;
  });
}

function getColumnValues(item) {
  // An Array of all item column's value('{name}', '{brand}', etc...)
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
