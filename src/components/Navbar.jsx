import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🎲 Dice Arena Pro
      </div>

      <div className="nav-links">
        <Link to="/">🏠 Home</Link>

        <Link to="/game">
          🎮 Game
        </Link>

        <Link to="/leaderboard">
          🏆 Leaderboard
        </Link>

        <Link to="/stats">
          📊 Stats
        </Link>

        <Link to="/settings">
          ⚙ Settings
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;