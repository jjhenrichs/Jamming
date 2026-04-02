import "./App.css";
import { useEffect, useState } from "react";
import Spotify from "./utils/Spotify";
import SearchBar from "./SearchBar/SearchBar";
import Results from "./Results/Results";
import Playlist from "./Playlist/Playlist";

function App() {
  const [songName, setSongName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    Spotify.getAccessToken();

    const timer = setTimeout(
      () => {
        Spotify.getRefreshToken();
      },
      1000 * 60 * 60,
    ); // Refresh token every hour

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const search = async (e) => {
    e.preventDefault();
    console.log("Searching for song:", songName);
    const data = await Spotify.search(songName);

    if (data != null) {
      setSearchResults(data);
    }
  };

  const handleSearchInput = ({ target }) => {
    setSongName(target.value);
  };

  const clearSearch = (e) => {
    e.preventDefault();
    setSongName("");
    setSearchResults([]);
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
      <div className="results-playlist-container">
        <Results songs={searchResults} />
        <Playlist />
      </div>
    </div>
  );
}

export default App;
