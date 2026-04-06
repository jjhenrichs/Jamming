import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

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
      <p className="buffer"></p>
    </div>
  );
}
