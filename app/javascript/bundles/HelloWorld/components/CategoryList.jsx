import React from 'react';
import PropTypes from 'prop-types';
import Items from './Items'

export default class CategoryList extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
  }
  /**
   * @params props
   */

   constructor(props) {
     super(props);
     this.state = {
       items: this.props.items,
       categories: this.props.categories,
       selectedCategory: 'All',
       selectedCategoryItems: this.props.items
     }
   }




  getItemsJson = (categoryName) => {
    fetch("/items.json")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('result');
          console.log(result);
          this.setState({
            selectedCategory: categoryName,
            selectedCategoryItems: result[categoryName]
          });
        },
        (error) => {
          console.error(error);
        }
      )
  }
  getItems = (event) => {
   // event.persist();

   let categoryName = event.target.innerText;
   this.getItemsJson(categoryName)
  }

   render() {
    let categories = this.state.categories,
        items = this.state.items,
        sc = this.state.selectedCategory,
        sci = this.state.selectedCategoryItems;
        console.log('sci category lists');
        console.log(sci);
     return (
       <div className="category-items">
          <div className="category-list">
            <ul>
            {categories.map((cat, ind)=> {
              return <li key={ind} onClick={this.getItems}>{cat.category}</li>
            })}
            </ul>
          </div>
          <div className="items-component">
            <Items
              items={sci}
              selectedCategory={sc}
            />
          </div>
       </div>
     )
   }

}
