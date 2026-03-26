import "./App.css";
import { useEffect, useState } from "react";
import Spotify from "./utils/Spotify";
import SearchBar from "./SearchBar/SearchBar";

function App() {
  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  return (
    <div className="App">
      <h1>Jamming</h1>
      <SearchBar />
    </div>
  );
}

export default App;
