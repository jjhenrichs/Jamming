import "./App.css";
import { useEffect, useState, useRef } from "react";
import Spotify from "./utils/Spotify";
import SearchBar from "./SearchBar/SearchBar";
import Results from "./Results/Results";
import Playlist from "./Playlist/Playlist";

function App() {
  const [songName, setSongName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const isInitialize = useRef(false); // useRef to track initialization across renders

  useEffect(() => {
    // Only initialize once
    if (!isInitialize.current) {
      initialize();
      isInitialize.current = true;
    }

    const timer = setInterval(
      () => {
        Spotify.getRefreshToken();
      },
      1000 * 60 * 60,
    ); // Refresh token every hour

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const initialize = () => {
    Spotify.getAccessToken();
  };

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

  const addTrack = ({ target }) => {
    console.log("Adding track:", target.value);
    setPlaylistTracks((prevTracks) => [...prevTracks, target.value]);
    console.log("Current playlist tracks:", playlistTracks);
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
        <Results songs={searchResults} addTrack={addTrack} />
        <Playlist playlist={playlistTracks} />
      </div>
    </div>
  );
}

export default App;
