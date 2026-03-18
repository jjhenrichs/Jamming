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
  };

  const clear = () => {
    setSearchInput("");
  };

  const search = () => {
    console.log("Searching for:", searchInput);
  };

  return (
    <div className={style.App}>
      <h1>Jamming</h1>
      <SearchBar
        value={searchInput}
        onChange={handleSearchInputChange}
        clear={clear}
        search={search}
      />
    </div>
  );
}

export default App;
