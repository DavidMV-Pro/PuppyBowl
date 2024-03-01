import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  return (
    <div id="navbar">
      <Link to="/all-players" className="link">All Players</Link>
      <Link to="/new-player-form" className="link">New Player Form</Link>
    </div>
  );
}
