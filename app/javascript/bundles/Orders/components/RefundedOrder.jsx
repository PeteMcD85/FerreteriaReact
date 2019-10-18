import React from "react";
import PropTypes from "prop-types";

export default class RefundedOrders extends React.Component {
  static propTypes = {
    refundOrder: PropTypes.object.isRequired
  };
  /**
   * @param props
   */

  constructor(props) {
    super(props);
    this.state = {
      refundOrder: this.props.refundOrder
    };
    console.log(this.state);
  }

  componentDidMount() {
  }



  getItemOrdersRefunded = (startRange, endRange) => {
    console.log(startRange);
    console.log(endRange);
    fetch(
      `/get_item_orders_refunded.json?startDate=${startRange}&endDate=${endRange}`
    )
      .then(res => res.json())
      .then(
        result => {
          console.log("working");
          this.setState({ refundedOrders: result.refunded_orders });
        },
        error => {
          console.error(
            "Error retrieving results for updateSelectedNavList AJAX method"
          );
          console.error(error);
        }
      );
  };

  render() {
    console.log(this.state);
    return (
        <table>
          <caption>Refunded Order</caption>
          <tbody>
          </tbody>
        </table>
    );
  }
}
