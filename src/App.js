import "./App.css";
import { useEffect, useState } from "react";
import Spotify from "./utils/Spotify";

function App() {
  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  return (
    <div className="App">
      <h1>Jamming</h1>
    </div>
  );
}

export default App;
