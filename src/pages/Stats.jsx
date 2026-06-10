function Stats() {

  const totalRolls =
    Number(
      localStorage.getItem("totalRolls")
    ) || 0;

  const wins =
    JSON.parse(localStorage.getItem("wins")) || {};

  const totalPlayers =
    Object.keys(wins).length;

  const totalWins =
    Object.values(wins).reduce(
      (a, b) => a + b,
      0
    );

  return (
    <div className="page">

      <h1>📊 Statistics</h1>

      <div className="card">
        <h2>🎲 Total Rolls</h2>
        <h3>{totalRolls}</h3>
      </div>

      <div className="card">
        <h2>🏆 Total Wins</h2>
        <h3>{totalWins}</h3>
      </div>

      <div className="card">
        <h2>👥 Players</h2>
        <h3>{totalPlayers}</h3>
      </div>

    </div>
  );
}

export default Stats;