import "./SearchBar.css";

const SearchBar = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.search();
  };
  return (
    <div className="sb_container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search_bar"
          value={props.value}
          onChange={props.onChange}
        />
        <div className="sb_button_container">
          <button type="submit" className="sb_button">
            Search
          </button>
          <button type="clear" className="sb_button" onClick={props.clear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
