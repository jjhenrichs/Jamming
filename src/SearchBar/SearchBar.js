import "./SearchBar.css";

export default function SearchBar() {
  return (
    <div className="container">
      <form>
        <input type="text" placeholder="Enter A Song" />
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
