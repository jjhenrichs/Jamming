import React from "react";

const SearchBar = (props) => {
  return (
    <div>
      <input type="text" value={props.value} onChange={props.onChange} />
      <button>Search</button>
      <button onClick={props.clear}>Clear</button>
    </div>
  );
};

export default SearchBar;
