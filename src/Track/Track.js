import "./Track.css";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";

export default function Track(props) {
  return (
    <div className="track_container">
      <FaPlayCircle
        className="music_icon"
        onClick={() => console.log(`Playing: ${props.songName}`)}
      />
      <div className="track_info">
        <h3 className="song_name">{props.songName}</h3>
        <p className="artist_info">
          {props.artist} | {props.album}
        </p>
      </div>
      <button
        className="add_button"
        onClick={() => props.addTrack(props.track)}
      >
        +
      </button>
    </div>
  );
}
