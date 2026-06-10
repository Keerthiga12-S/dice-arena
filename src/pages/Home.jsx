import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <div className="hero">
        <h1>🎲 Dice Arena Pro</h1>

        <p>
          Challenge your friends, roll the dice,
          unlock achievements and become
          the ultimate Dice Champion.
        </p>

        <div className="hero-buttons">
          <Link to="/setup">
            <button>🎮 Start Game</button>
          </Link>

          <Link to="/LeaderBoard">
            <button>🏆 LeaderBoard</button>
          </Link>
        </div>
      </div>

      <div className="features">

        <div className="card">
          <h3>🎯 Custom Target</h3>
          <p>
            Choose your own winning score.
          </p>
        </div>

        <div className="card">
          <h3>🏅 Achievements</h3>
          <p>
            Unlock badges and rewards.
          </p>
        </div>

        <div className="card">
          <h3>📊 Statistics</h3>
          <p>
            Track rolls and victories.
          </p>
        </div>

        <div className="card">
          <h3>🎵 Sounds</h3>
          <p>
            Real dice rolling experience.
          </p>
        </div>

      </div>

      <div className="rules">
        <h2>📜 Game Rules</h2>

        <p>🎯 Reach target score first.</p>
        <p>🎁 Roll 6 = Bonus +5 Points.</p>
        <p>💥 Roll 1 = Lose 2 Points.</p>
      </div>

    </div>
  );
}

export default Home;