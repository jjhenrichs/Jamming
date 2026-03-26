import "./SearchBar.css";

export default function SearchBar() {
  return (
    <div className="container">
      <form>
        <input type="text" placeholder="Enter A Song" />
        <div className="search-buttons">
          <button type="submit">Search</button>
          <button type="reset">Clear</button>
        </div>
      </form>
    </div>
  );
}
