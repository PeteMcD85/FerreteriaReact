import PropTypes from 'prop-types';
import React from 'react';

// COMPONENTS
import ItemCard from './ItemCard'
import ItemsTable from './ItemsTable'

// IMAGES
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

  get_image(name) {
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
    let items = this.props.items,
        sc = this.props.selectedCategory;
    // console.log('items from items');
    // console.log(items);
    if (sc !== "PVC") {
      return (
        <div>
        <div className="item-cards">
          <ul>
            {items.map((item,ind)=>{
              return (
                <ItemCard
                  key = {ind}
                  id = {item.id}
                  category={item.category}
                  name={item.name}
                  brand={item.brand}
                  color={item.color}
                  size={item.size}
                  thickness={item.thickness}
                  price={item.price}
                  image={this.get_image(item.name)}
                  active={item.active}
                   />
                 )
            })}
          </ul>
        </div>
        </div>
      );
    } else {
      return (
        <div>
          <ItemsTable  items={items} />
        </div>
      );
    }
  } // END of render method
}
