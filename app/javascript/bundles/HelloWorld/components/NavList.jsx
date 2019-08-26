import React from "react";

const NavList = props => {
  let columnList = props.columnList,
    columnName = props.columnName,
    getCategoryBrand = props.getCategoryBrand,
    isCategory = columnName === "category" ? true : false,
    updateNav = event => {
      let navPropName = event.target.innerText;
      getCategoryBrand(columnName, navPropName);
    };
  return (
    <div className={`${columnName}-list hidden`}>
      <ul>
        {isCategory && <li onClick={updateNav}>Todo</li>}
        {columnList.map((nav, ind) => {
          return (
            <li key={ind} onClick={updateNav}>
              {nav[`${columnName}`]}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavList;
