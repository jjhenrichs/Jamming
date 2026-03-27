import "./Tracklist.css";
import Track from "../Track/Track";

export default function Tracklist() {
  return (
    <div className="track_container">
      <Track songName="Song 1" artist="Artist 1" album="Album 1" />
      <Track songName="Song 2" artist="Artist 2" album="Album 2" />
      <Track songName="Song 3" artist="Artist 3" album="Album 3" />
    </div>
  );
}
