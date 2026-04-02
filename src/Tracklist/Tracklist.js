import "./Tracklist.css";
import Track from "../Track/Track";

export default function Tracklist(props) {
  return (
    <div className="track_container">
      {props.tracks.map((track) => (
        <Track
          key={track.id}
          songName={track.song_name}
          artist={track.artist}
          album={track.album}
          className="track"
        />
      ))}
      <Track
        songName="Song 1"
        artist="Artist 1"
        album="Album 1"
        className="track"
      />
      <Track
        songName="Song 2"
        artist="Artist 2"
        album="Album 2"
        className="track"
      />
      <Track
        songName="Song 3"
        artist="Artist 3"
        album="Album 3"
        className="track"
      />
    </div>
  );
}
