import React from "react";

const SearchBar = (props) => {
  return (
    <div>
      <input type="text" value={props.value} onChange={props.onChange} />
      <button>Clear</button>
    </div>
  );
};

export default SearchBar;
