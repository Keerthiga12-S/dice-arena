function LeaderBoard() {

  const wins =
    JSON.parse(localStorage.getItem("wins")) || {};

  const sortedPlayers =
    Object.entries(wins).sort(
      (a, b) => b[1] - a[1]
    );

  return (
    <div className="page">

      <h1>🏆 LeaderBoard</h1>

      {sortedPlayers.length === 0 ? (
        <h3>No records yet</h3>
      ) : (
        sortedPlayers.map(
          ([name, score], index) => (
            <div
              className="card"
              key={name}
            >
              <h2>
                #{index + 1} {name}
              </h2>

              <h3>
                {score} Wins
              </h3>
            </div>
          )
        )
      )}

    </div>
  );
}

export default LeaderBoard;