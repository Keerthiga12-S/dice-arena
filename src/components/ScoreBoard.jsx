function ScoreBoard({
  p1,
  p2,
  player1 = "Player 1",
  player2 = "Player 2"
}) {
  return (
    <div className="scoreboard">

      <div className="score-card">
        <h2>👤 {player1}</h2>

        <h1>{p1}</h1>

        <p>Points</p>
      </div>

      <div className="score-card">
        <h2>👤 {player2}</h2>

        <h1>{p2}</h1>

        <p>Points</p>
      </div>

    </div>
  );
}

export default ScoreBoard;