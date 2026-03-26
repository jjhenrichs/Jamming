import "./App.css";
import { useEffect, useState } from "react";
import Spotify from "./utils/Spotify";
import SearchBar from "./SearchBar/SearchBar";

function App() {
  const [songName, setSongName] = useState("");

  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  const search = (e) => {
    e.preventDefault();
    console.log("Searching for song:", songName);
    // setSongName(target.value);
  };

  const handleSearchInput = ({ target }) => {
    console.log(target.value);
    setSongName(target.value);
  };

  return (
    <div className="App">
      <h1>Jamming</h1>
      <SearchBar
        onSearch={search}
        value={songName}
        onChange={handleSearchInput}
      />
    </div>
  );
}

export default App;
