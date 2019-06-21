import React from 'react'

const CategoryListTwo = (props) => {

  let categories = props.categories,
      updateSelectedCategoryList = props.updateSelectedCategoryList,
      updateCategory = (event) => {
       let categoryName = event.target.innerText;
       updateSelectedCategoryList(categoryName)
     };
  return (
    <div className="category-list">
      <ul>
        <li onClick={updateCategory}>All</li>
        {categories.map((cat, ind)=> {
          return <li key={ind} onClick={updateCategory}>{cat.category}</li>
        })}
      </ul>
    </div>
  )

}


export default CategoryListTwo
