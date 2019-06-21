import PropTypes from 'prop-types';
import React from 'react';

// COMPONENTS
import Items from './Items';
import CategoryList from './CategoryList';


export default class HelloWorld extends React.Component {
  static propTypes = {
    activeItems: PropTypes.array.isRequired,
    inactiveItems: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    signedIn: PropTypes.bool.isRequired
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);
    this.state = {
      activeItems: this.props.activeItems,
      inactiveItems: this.props.inactiveItems,
      categories: this.props.categories,
      selectedCategory: "All",
      selectedCategoryList: this.props.activeItems,
      selectedCategoryListInactives: this.props.inactiveItems,
      signedIn: this.props.signedIn
   };
  }

  updateSelectedCategoryList = (categoryName) => {
    fetch("/items.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            selectedCategory: categoryName,
            selectedCategoryList: result.actives[categoryName],
            selectedCategoryListInactives: result.inactives[categoryName]
          });
        },
        (error) => {
          console.error(error);
        }
      )
  }

  render() {
    let inactiveItems = this.state.inactiveItems,
        activeItems = this.state.activeItems,
        categories = this.state.categories,
        selectedCategory = this.state.selectedCategory,
        selectedCategoryList = this.state.selectedCategoryList,
        selectedCategoryListInactives = this.state.selectedCategoryListInactives,
        signedIn = this.state.signedIn;
    return (
      <div className="hello-world">
        <CategoryList
          categories={categories} updateSelectedCategoryList={this.updateSelectedCategoryList}
        />
        <Items
          items={selectedCategoryList}
          selectedCategory={selectedCategory}
          signedIn = {signedIn}
        />
        {signedIn &&
          <div>
            <h2>Inactive Items</h2>
            <Items
              items={selectedCategoryListInactives}
              selectedCategory={selectedCategory}
              signedIn = {signedIn}
            />
          </div>
        }
      </div>
    );
  }
}
