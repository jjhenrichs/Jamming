import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";
import { AiOutlineSpotify } from "react-icons/ai";

export default function Playlist(props) {
  return (
    <div className="playlist_container">
      <div className="playlist_header">
        <input
          type="text"
          className="playlist_name"
          value={props.playlistName}
          onChange={props.onNameChange}
        />
      </div>

      <Tracklist
        tracks={props.playlist}
        inPlaylist={true}
        removeTrack={props.removeTrack}
      />
      <div className="save_btn_container">
        <button type="submit" className="save_button" onClick={props.onSave}>
          <AiOutlineSpotify className="save_icon" />
        </button>
      </div>
      <p className="buffer"></p>
    </div>
  );
}
