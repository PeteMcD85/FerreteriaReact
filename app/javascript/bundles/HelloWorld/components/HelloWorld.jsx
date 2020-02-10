import PropTypes from "prop-types";
import React from "react";
import LS from "local-storage";

import Items from "./items/Items";

export default class HelloWorld extends React.Component {
  static propTypes = {
    current_user: PropTypes.object
    // picUrls: PropTypes.array.isRequired
  };

  /**
   * @param props
   */

  constructor(props) {
    super(props);
    this.state = {
      // activeItems: this.props.activeItems,
      // inactiveItems: this.props.inactiveItems,
      currentUser: this.props.current_user,
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
    let { currentUser, key } = this.state;
    return (
      <div className="hello-world">
        <Items
          {...{
            // key,
            // activeItems,
            // inactiveItems,
            currentUser,
            setKey: this.setKey
          }}
        />
      </div>
    );
  }
}
