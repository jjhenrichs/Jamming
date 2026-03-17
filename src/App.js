import { useState, useEffect } from "react";
import Spotify from "./utils/spotifyAuth";

function App() {
  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await Spotify.getAccessToken();
    };
    fetchToken();
  }, []);

  return (
    <div>
      <h1>Jamming</h1>
    </div>
  );
}

export default App;
