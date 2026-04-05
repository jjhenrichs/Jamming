import "./Track.css";

export default function Track(props) {
  return (
    <div className="track_container">
      <div className="track_info">
        <h3 className="song_name">{props.songName}</h3>
        <p className="artist_info">
          {props.artist} | {props.album}
        </p>
      </div>
      {props.inPlaylist ? (
        <button
          className="action_button"
          onClick={() => props.removeTrack(props.track)}
        >
          -
        </button>
      ) : (
        <button
          className="action_button"
          onClick={() => props.addTrack(props.track)}
        >
          +
        </button>
      )}
    </div>
  );
}
