import PropTypes from 'prop-types';
import React from 'react';
import Item from './Item'
import Pvc from 'images/pvc.png'

export default class Items extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired, // this is passed from the Rails view
  };
/**
* @params propTypes
*/
  constructor(props) {
    super(props);
    this.state = {
      // items: this.props.items,
      images: [
        {pvc: Pvc}
      ]
    };
  }

  get_image(name){
    let images = this.state.images,
        image= '';
        images.forEach((val)=>{
          let key = Object.keys(val)[0];
          if (name.toLowerCase() === key) image = val[key];
        }
      )
    return image
  }

  render() {
    let items = this.props.items;
    console.log('items from items');
    console.log(items);
    return (
      <div>
        <h3>
          Items
        </h3>
        <ul>
          {items.map((item,ind)=>{
            return (
              <Item
                key={ind}
                category={item.category}
                name={item.name}
                brand={item.brand}
                color={item.color}
                size={item.size}
                thickness={item.thickness}
                price={item.price}
                image={this.get_image(item.name)}
                 />)
          })}
        </ul>

      </div>
    );
  }
}
