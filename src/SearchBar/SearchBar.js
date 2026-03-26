import "./SearchBar.css";

export default function SearchBar(props) {
  return (
    <div className="container">
      <form onSubmit={props.onSearch} onReset={props.onClear}>
        <input
          type="text"
          name="songInput"
          className="search_bar"
          placeholder="Enter A Song"
          value={props.value}
          onChange={props.onChange}
        />
        <div className="search_buttons">
          <button type="submit" className="search_button">
            Search
          </button>
          <button type="reset" className="search_button">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
