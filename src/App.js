import "./App.css";
import { use, useEffect, useState } from "react";
import Spotify from "./utils/Spotify";
import SearchBar from "./SearchBar/SearchBar";
import Results from "./Results/Results";

function App() {
  const [songName, setSongName] = useState("");

  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  const search = async (e) => {
    e.preventDefault();
    console.log("Searching for song:", songName);
    await Spotify.search(songName);
  };

  const handleSearchInput = ({ target }) => {
    console.log(target.value);
    setSongName(target.value);
  };

  const clearSearch = (e) => {
    e.preventDefault();
    setSongName("");
  };

  return (
    <div className="App">
      <h1>Jamming</h1>
      <SearchBar
        onSearch={search}
        value={songName}
        onChange={handleSearchInput}
        onClear={clearSearch}
      />
      <Results />
    </div>
  );
}

export default App;
