import PropTypes from "prop-types";
import React from "react";
import LS from "local-storage";

import Items from "./items/Items";

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
      signedIn: this.props.signedIn,
      key: 0
    };
  }

  setKey = () => {
    console.log("setket");
    this.setState(prevState => {
      return { key: prevState.key + 1 };
    });
  };

  render() {
    let { activeItems, inactiveItems, signedIn, key } = this.state;
    return (
      <div className="hello-world">
        <Items
          {...{
            key,
            activeItems,
            inactiveItems,
            signedIn,
            setKey: this.setKey
          }}
        />
      </div>
    );
  }
}
