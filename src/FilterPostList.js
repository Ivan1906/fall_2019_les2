import React from "react";
import T from "prop-types";

const FilterPostList = ({ changeTextInput, changeSelect }) => {
  return (
    <div className="filter">
      <input type="text" onChange={changeTextInput} />
      <select onChange={changeSelect}>
        <option value="title">title</option>
        <option value="body">body</option>
      </select>
    </div>
  );
};

FilterPostList.defaultProps = {
  changeTextInput: () => console.log("No found function changeTextInput!"),
  changeSelect: () => console.log("No found function changeSelect!")
};
FilterPostList.displayName = "FilterPostList";
FilterPostList.propTypes = {
  changeTextInput: T.func.isRequired,
  changeSelect: T.func.isRequired
};

export default FilterPostList;
