import { useState, useEffect } from "react";
import Spotify from "./utils/spotifyAuth";
import SearchBar from "./SearchBar/SearchBar";
import "./App.css";
import Results from "./Results/Results";

function App() {
  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = ({ target }) => {
    setSearchInput(target.value);
  };

  const clear = (e) => {
    e.preventDefault();
    setSearchInput("");
  };

  const search = () => {
    console.log("Searching for: ", searchInput);
    const results = Spotify.search(searchInput);
  };

  return (
    <div className="app_container">
      <h1>Jamming</h1>
      <SearchBar
        value={searchInput}
        onChange={handleSearchInputChange}
        clear={clear}
        search={search}
      />
      <Results />
    </div>
  );
}

export default App;
