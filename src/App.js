import { useState, useEffect } from "react";
import Spotify from "./utils/spotifyAuth";
import SearchBar from "./SearchBar/SearchBar";
import "./App.css";

function App() {
  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  const [searchInput, setSearchInput] = useState("");
  const [contentType, setContentType] = useState("");

  const handleSearchInputChange = ({ target }) => {
    setSearchInput(target.value);
  };

  const clear = () => {
    setSearchInput("");
  };

  const search = () => {
    console.log("Searching for: ", searchInput);
    Spotify.search(searchInput);
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
    </div>
  );
}

export default App;
