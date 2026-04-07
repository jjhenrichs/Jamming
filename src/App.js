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
  const [playlistName, setPlaylistName] = useState("New Playlist");

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

  const addTrack = (track) => {
    if (playlistTracks.some((t) => t.id === track.id)) {
      console.warn("Track already in playlist:", track.song_name);
      alert(`${track.song_name} has already been added`);
    } else {
      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    }
  };

  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((t) => t.id !== track.id),
    );
  };

  const changePlaylistName = ({ target }) => {
    setPlaylistName(target.value);
  };

  const savePlaylist = () => {
    console.log("Saving playlist:", playlistName, playlistTracks);
    console.log(playlistTracks.length);

    if (playlistTracks.length >= 1) {
      console.log("Saving playlist:", playlistName, playlistTracks);
    } else {
      alert("Cannot save an empty playlist.");
    }
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
        <Playlist
          playlist={playlistTracks}
          removeTrack={removeTrack}
          onNameChange={changePlaylistName}
          playlistName={playlistName}
          onSave={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;
