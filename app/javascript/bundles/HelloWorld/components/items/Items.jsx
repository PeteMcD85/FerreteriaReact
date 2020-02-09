import React, { useState, useRef, useEffect, useContext } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// +++++++++ CONTEXTS +++++++++
import CartContext from "../contexts/CartContext";

// +++++++++ COMPONENTS +++++++++
import Accountant from "../accountant/Accountant";
import CartMain from "../cart/CartMain";
import ItemsCard from "./ItemsCard";
import ItemsTable from "./ItemsTable";

// +++++++++++ VARIABLES +++++++++++
// Array of categories/brands to be displayed in tables rather than cards
import tableDisplayedCategories from "./variables/tableDisplayedCategories";

// Array of column names for searchBar to compare to items
import columnsToSearch from "./variables/columnsToSearch";

function Items(props) {
  let { currentUser, setKey } = props,
    [items, setItems] = useState({}),
    // [activeItems, setActiveItems] = useState([]),
    // [inactiveItems, setInactiveItems] = useState([]),
    [displayedItems, setDisplayedItems] = useState([]),
    [query, setQuery] = useState(""),
    [cartItems, setCartItems] = useState([]),
    [showCart, setShowCart] = useState(true),
    { itemsCard, itemsTable } = splitItemsCardsOrTable(displayedItems);

  useEffect(() => {
    setDisplayedItems(
      filterItemsFromQuery(
        query,
        items && items.activeItems ? items.activeItems : []
      )
    );
  }, [query]);

  useEffect(() => {
    console.log(currentUser);
    getItems();
    // setQuery("PVC");
  }, []);

  function getItems() {
    fetch(`/get_items`)
      .then(res => res.json())
      .then(
        result => {
          setItems({
            activeItems: result.active_items
            // inactiveItems: result.inactive_items
          });
        },
        error => {
          console.error("Error retrieving results for getItems AJAX method");
          console.error(error);
        }
      );
  }

  return (
    <div>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/inventario">Inventario</Link>
              </li>
              <li>
                <Link to="/">Articulos</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/inventario">
              <Accountant {...{ items, setItems }} />
            </Route>

            <Route path="/cart">
              <CartContext.Provider
                value={{
                  cartItems,
                  addToCart,
                  removeFromCart,
                  updateCartItem,
                  setCartItems
                }}
              >
                <CartMain {...{ setKey }} />
              </CartContext.Provider>
            </Route>
            <Route path="/">
              <div>
                <input
                  type="text"
                  id="items-searchbar"
                  placeholder="Search for Items...."
                  onChange={e => setQuery(e.target.value.trim().toLowerCase())}
                ></input>
                <div className="item-cards">
                  <CartContext.Provider
                    value={{
                      cartItems,
                      addToCart,
                      removeFromCart,
                      updateCartItem,
                      setCartItems
                    }}
                  >
                    {displayedItems.length === 0 && (
                      <div id="no-items">
                        <p>Search For Items</p>
                      </div>
                    )}
                    {displayedItems.length !== 0 && (
                      <div>
                        <ItemsTable displayedItems={itemsTable} />
                        <ItemsCard displayedItems={itemsCard} />
                      </div>
                    )}
                  </CartContext.Provider>
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );

  function updateItems() {
    return false;
  }

  function clearCartItems() {
    setCartItems([]);
  }

  function addToCart(item, quantity) {
    // cartId is so that cart Items display in same order
    let cartId = cartItems.length === 0 ? 1 : nextCartId();
    // Adds Item to CartItems Array
    let ci = cartItems.slice();
    ci.push({
      cartId,
      item: item,
      quantity,
      priceGiven: item.sold_price,
      subtotal: (quantity * item.sold_price).toFixed(2)
    });
    setCartItems(ci);
  }

  function nextCartId() {
    return (
      cartItems.sort(function(a, b) {
        return b.cartId - a.cartId;
      })[0].cartId + 1
    );
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
