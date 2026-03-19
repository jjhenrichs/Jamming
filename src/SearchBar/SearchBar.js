import "./SearchBar.css";

const SearchBar = (props) => {
  return (
    <div className="sb_container">
      <div className="filter_btns">
        <button className="filter_btn">Songs</button>
        <button className="filter_btn">Artists</button>
        <button className="filter_btn">Albums</button>
      </div>
      <input
        type="text"
        className="search_bar"
        value={props.value}
        onChange={props.onChange}
      />
      <div className="sb_button_container">
        <button className="sb_button" onClick={props.search}>
          Search
        </button>
        <button className="sb_button" onClick={props.clear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
