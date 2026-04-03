import "./Results.css";
import Tracklist from "../Tracklist/Tracklist";

export default function Results(props) {
  return (
    <div className="results_container">
      <h2>Results</h2>
      <Tracklist tracks={props.songs} addTrack={props.addTrack} />
      <p className="buffer"></p>
    </div>
  );
}
