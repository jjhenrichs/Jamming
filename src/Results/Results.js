import "./Results.css";
import Tracklist from "../Tracklist/Tracklist";

export default function Results() {
  return (
    <div className="results_container">
      <h2>Results</h2>
      <Tracklist />
      <p className="buffer"></p>
    </div>
  );
}
