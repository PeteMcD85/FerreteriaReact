import React from 'react'

const NavList = (props) => {
  let columnList = props.columnList,
      columnName = props.columnName,
      updateSelectedNavList = props.updateSelectedNavList,
      isCategory = (columnName === 'category') ? true : false,
      updateNav = (event) => {
       let navPropName = event.target.innerText;
       updateSelectedNavList(navPropName)
     };

     console.log(columnList);
  return (
    <div className={`${columnName}-list` }>
      <ul>
        {isCategory && <li onClick={updateNav}>All</li>}
        {columnList.map((nav, ind)=> {
          return <li key={ind} onClick={updateNav}>{nav[`${columnName}`]}</li>
        })}
      </ul>
    </div>
  )
}

export default NavList
