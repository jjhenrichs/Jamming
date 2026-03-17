import { useState, useEffect } from "react";
import Spotify from "./utils/spotifyAuth";
import style from "./App.css";

function App() {
  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await Spotify.getAccessToken();
    };
    fetchToken();
  }, []);

  return (
    <div className={style.App}>
      <h1>Jamming</h1>
    </div>
  );
}

export default App;
