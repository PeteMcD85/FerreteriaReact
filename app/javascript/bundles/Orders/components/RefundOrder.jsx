import React from "react";
import PropTypes from "prop-types";

export default class RefundOrder extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired
  };
  /**
   * @param props
   */

  constructor(props) {
    super(props);
    this.state = {
      order: props.order
    };
  }

  componentDidMount() {
  }

  render() {
    console.log(this.state);
    return (
      <div className="refund-order">

        <table>
          <caption>Refund Order</caption>
          <tbody>

          </tbody>
        </table>
      </div>
    );
  }
}
