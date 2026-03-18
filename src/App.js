import { useState, useEffect } from "react";
import Spotify from "./utils/spotifyAuth";
import SearchBar from "./SearchBar";
import style from "./App.css";

function App() {
  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await Spotify.getAccessToken();
    };
    fetchToken();
  }, []);

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = ({ target }) => {
    setSearchInput(target.value);
    console.log("Search input:", searchInput);
  };

  const clear = () => {
    setSearchInput("");
  };

  return (
    <div className={style.App}>
      <h1>Jamming</h1>
      <SearchBar value={searchInput} onChange={handleSearchInputChange} />
    </div>
  );
}

export default App;
