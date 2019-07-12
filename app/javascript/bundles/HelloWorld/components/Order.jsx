import React from 'react'
import PropTypes from 'prop-types'

export default class Order extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      order: props.order
    }
    console.log(this.state);
  }

  render(){
    return (
      <div className="order">Order</div>
    )
  }
}
