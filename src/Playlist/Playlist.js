import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

export default function Playlist(props) {
  return (
    <div className="playlist_container">
      <h2>Playlist</h2>
      <Tracklist tracks={props.playlist} inPlaylist={true} />
      <p className="buffer"></p>
    </div>
  );
}
