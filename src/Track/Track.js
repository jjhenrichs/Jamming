import "./Track.css";

export default function Track(props) {
  return (
    <div className="container">
      <h3>{props.songName}</h3>
      <p>
        {props.artist} | {props.album}
      </p>
    </div>
  );
}
