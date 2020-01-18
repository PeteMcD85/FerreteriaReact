import PropTypes from "prop-types";
import React from "react";
import LS from "local-storage";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CartContext from "./contexts/CartContext";

import cartContextValue from "./contexts/cartContextValue";

// COMPONENTS
import Accountant from "./accountant/Accountant";
import Items from "./items/Items";
// import NavList from "./NavList";

export default class HelloWorld extends React.Component {
  static propTypes = {
    activeItems: PropTypes.array.isRequired,
    inactiveItems: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    brands: PropTypes.array.isRequired,
    signedIn: PropTypes.bool.isRequired
    // picUrls: PropTypes.array.isRequired
  };

  /**
   * @param props
   */

  constructor(props) {
    super(props);
    this.state = {
      activeItems: this.props.activeItems,
      inactiveItems: this.props.inactiveItems,
      brands: this.props.brands,
      categories: this.props.categories,
      selectedNavName: "Todo",
      selectedNavList: [],
      selectedNavListInactives: [],
      signedIn: this.props.signedIn,
      // picUrls: this.props.picUrls,
      cart: {
        cartItems: [],
        cartTotal: {
          subtotal: 0,
          taxes: 0,
          total: 0
        }
      },
      showCart: false,
      taxFree: false,
      paymentMethod: "",
      query: "",
      queryListActiveItems: this.props.activeItems,
      showQueryList: false,
      queryLength: 0,
      customerChange: 0,
      customTotal: 0,
      customItemId: 9999,
      itemsStartRange: 0,
      itemsEndRange: 10,
      showAccountant: false,
      savedCarts: []
    };
  }

  componentDidMount() {
    let savedCarts = LS.get("savedCarts");
    if (!savedCarts) LS.set("savedCarts", []);
    this.setState({ savedCarts: savedCarts });
  }

  render() {
    let activeItems = this.state.activeItems,
      inactiveItems = this.state.inactiveItems,
      signedIn = this.state.signedIn;
    return (
      <div className="hello-world">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/inventario">Inventario</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/inventario">
                <Accountant
                  activeItems={activeItems}
                  updateItems={this.updateItems}
                  inactiveItems={inactiveItems}
                />
              </Route>
              <Route path="/">
                <Items
                  activeItems={activeItems}
                  inactiveItems={inactiveItems}
                  signedIn={signedIn}
                />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
