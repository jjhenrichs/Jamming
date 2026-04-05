import "./Tracklist.css";
import Track from "../Track/Track";

export default function Tracklist(props) {
  return (
    <div className="track_container">
      {props.tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          songName={track.song_name}
          artist={track.artist}
          album={track.album}
          className="track"
          addTrack={props.addTrack}
          inPlaylist={props.inPlaylist}
        />
      ))}
    </div>
  );
}
