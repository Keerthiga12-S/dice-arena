import { useState, useEffect } from "react";
import Dice from "../components/Dice";
import ScoreBoard from "../components/ScoreBoard";
import Achievements from "../components/Achievements";

import Confetti from "react-confetti";

import roll from "../assets/roll.mp3";
import win from "../assets/win.mp3";

function Game() {

  const savedGame =
    JSON.parse(localStorage.getItem("saveGame")) || {};

  const [player1] = useState(
    localStorage.getItem("player1") || "Player 1"
  );

  const [player2] = useState(
    localStorage.getItem("player2") || "Player 2"
  );

  const [gameMode] = useState(
    localStorage.getItem("gameMode") || "multiplayer"
  );

  const [target] = useState(
    Number(localStorage.getItem("targetScore")) || 50
  );

  const [p1Score, setP1Score] = useState(
    savedGame.p1Score || 0
  );

  const [p2Score, setP2Score] = useState(
    savedGame.p2Score || 0
  );

  const [dice1, setDice1] = useState(
    savedGame.dice1 || 1
  );

  const [dice2, setDice2] = useState(
    savedGame.dice2 || 1
  );

  const [winner, setWinner] = useState(
    savedGame.winner || ""
  );

  const [totalRolls, setTotalRolls] = useState(
    Number(localStorage.getItem("totalRolls")) || 0
  );

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  const [seconds, setSeconds] = useState(
    Number(localStorage.getItem("seconds")) || 0
  );

  const [luckySixes, setLuckySixes] = useState(
    Number(localStorage.getItem("sixes")) || 0
  );

  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("highScore")) || 0
  );

  const playRollSound = () => {
    const soundEnabled =
      localStorage.getItem("sound") !== "false";

    if (soundEnabled) {
      new Audio(roll).play();
    }
  };

  const playWinSound = () => {
    const soundEnabled =
      localStorage.getItem("sound") !== "false";

    if (soundEnabled) {
      new Audio(win).play();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "seconds",
      seconds
    );
  }, [seconds]);

  const rollDice = () => {
    if (winner) return;

    playRollSound();

    const d1 =
      Math.floor(Math.random() * 6) + 1;

    const d2 =
      Math.floor(Math.random() * 6) + 1;

    setDice1(d1);
    setDice2(d2);

    let p1Add = d1;
    let p2Add = d2;

    // Bonus Rule
    if (d1 === 6) p1Add += 5;
    if (d2 === 6) p2Add += 5;

    // Penalty Rule
    if (d1 === 1) p1Add = -2;
    if (d2 === 1) p2Add = -2;

    const nextP1 =
      Math.max(0, p1Score + p1Add);

    const nextP2 =
      Math.max(0, p2Score + p2Add);

    setP1Score(nextP1);
    setP2Score(nextP2);

    const newRolls = totalRolls + 1;

    setTotalRolls(newRolls);

    localStorage.setItem(
      "totalRolls",
      newRolls
    );

    if (d1 === 6 || d2 === 6) {
      const sixes = luckySixes + 1;

      setLuckySixes(sixes);

      localStorage.setItem(
        "sixes",
        sixes
      );
    }

    const currentBest =
      Math.max(nextP1, nextP2);

    if (currentBest > highScore) {
      setHighScore(currentBest);

      localStorage.setItem(
        "highScore",
        currentBest
      );
    }

    const newHistory = [
      ...history,
      {
        player1Roll: d1,
        player2Roll: d2,
      },
    ];

    setHistory(newHistory);

    localStorage.setItem(
      "history",
      JSON.stringify(newHistory)
    );
  };

  const restartGame = () => {
    setP1Score(0);
    setP2Score(0);

    setDice1(1);
    setDice2(1);

    setWinner("");

    localStorage.removeItem("saveGame");
  };
   useEffect(() => {
    if (winner) return;

    if (p1Score >= target) {
      setWinner(player1);

      playWinSound();

      const wins =
        JSON.parse(localStorage.getItem("wins")) ||
        {};

      wins[player1] =
        (wins[player1] || 0) + 1;

      localStorage.setItem(
        "wins",
        JSON.stringify(wins)
      );

      const matches =
        JSON.parse(
          localStorage.getItem("matches")
        ) || [];

      matches.push({
        winner: player1,
        date: new Date().toLocaleString(),
      });

      localStorage.setItem(
        "matches",
        JSON.stringify(matches)
      );

      const gamesPlayed =
        Number(
          localStorage.getItem("gamesPlayed")
        ) || 0;

      localStorage.setItem(
        "gamesPlayed",
        gamesPlayed + 1
      );
    }

    if (p2Score >= target) {
      setWinner(player2);

      playWinSound();

      const wins =
        JSON.parse(localStorage.getItem("wins")) ||
        {};

      wins[player2] =
        (wins[player2] || 0) + 1;

      localStorage.setItem(
        "wins",
        JSON.stringify(wins)
      );

      const matches =
        JSON.parse(
          localStorage.getItem("matches")
        ) || [];

      matches.push({
        winner: player2,
        date: new Date().toLocaleString(),
      });

      localStorage.setItem(
        "matches",
        JSON.stringify(matches)
      );

      const gamesPlayed =
        Number(
          localStorage.getItem("gamesPlayed")
        ) || 0;

      localStorage.setItem(
        "gamesPlayed",
        gamesPlayed + 1
      );
    }
  }, [
    p1Score,
    p2Score,
    target,
    player1,
    player2,
    winner,
  ]);

  useEffect(() => {
    localStorage.setItem(
      "saveGame",
      JSON.stringify({
        player1,
        player2,
        gameMode,
        target,
        p1Score,
        p2Score,
        dice1,
        dice2,
        winner,
      })
    );
  }, [
    player1,
    player2,
    gameMode,
    target,
    p1Score,
    p2Score,
    dice1,
    dice2,
    winner,
  ]);

  const wins =
    JSON.parse(localStorage.getItem("wins")) ||
    {};

  const currentWins =
    wins[player1] || 0;

  const gamesPlayed =
    Number(
      localStorage.getItem("gamesPlayed")
    ) || 0;

  const winRate =
    gamesPlayed === 0
      ? 0
      : (
          (currentWins / gamesPlayed) *
          100
        ).toFixed(1);

  const leader =
    p1Score > p2Score
      ? player1
      : p2Score > p1Score
      ? player2
      : "Tie";

  const shareResult = () => {
    navigator.clipboard.writeText(
      `${player1}: ${p1Score}
${player2}: ${p2Score}
Winner: ${winner}`
    );

    alert("Score copied!");
  };

  const resetAllData = () => {
    localStorage.clear();

    window.location.reload();
  }; 
   return (
    <>
      {winner && <Confetti />}

      <div className="page">

        <h1>🎲 Dice Arena Pro</h1>

        <div className="rules">
          <h3>📜 Game Rules</h3>

          <p>🎯 Reach Target Score First</p>
          <p>🎁 Roll 6 = +5 Bonus Points</p>
          <p>💥 Roll 1 = Lose 2 Points</p>
        </div>

        <div className="game-info">
          <h3>👤 {player1}</h3>

          <h3>⚔️ VS ⚔️</h3>

          <h3>👤 {player2}</h3>

          <h4>🎮 Mode : {gameMode}</h4>

          <h4>🎯 Target : {target}</h4>
        </div>

        <div className="leader-box">
          <h2>
            👑 Current Leader : {leader}
          </h2>
        </div>

        <div className="timer-box">
          <h3>
            ⏱ Time Played : {seconds}s
          </h3>
        </div>

        <div className="dice-container">
          <Dice value={dice1} />

          <Dice value={dice2} />
        </div>

        <div className="btn-group">
          <button
            onClick={rollDice}
            disabled={winner}
          >
            🎲 Roll Dice
          </button>

          <button
            onClick={restartGame}
          >
            🔄 Restart Game
          </button>

          <button
            onClick={resetAllData}
          >
            🗑 Reset Data
          </button>
        </div>

        <div className="progress-section">

          <p>
            {player1}
          </p>

          <progress
            value={p1Score}
            max={target}
          ></progress>

          <p>
            {player2}
          </p>

          <progress
            value={p2Score}
            max={target}
          ></progress>

        </div>

        <ScoreBoard
          p1={p1Score}
          p2={p2Score}
        />

        <div className="score-cards">

          <div className="card">
            <h2>{player1}</h2>

            <h3>{p1Score}</h3>
          </div>

          <div className="card">
            <h2>{player2}</h2>

            <h3>{p2Score}</h3>
          </div>

        </div>

        <div className="stats-box">

          <h2>📊 Game Statistics</h2>

          <h3>
            🎲 Total Rolls :
            {" "}
            {totalRolls}
          </h3>

          <h3>
            🔥 Lucky Sixes :
            {" "}
            {luckySixes}
          </h3>

          <h3>
            🏆 Total Wins :
            {" "}
            {currentWins}
          </h3>

          <h3>
            📈 Win Rate :
            {" "}
            {winRate}%
          </h3>

          <h3>
            🚀 Highest Score :
            {" "}
            {highScore}
          </h3>

        </div>

        <div className="remaining-box">

          <h3>
            🎯 {player1}
            {" "}
            needs
            {" "}
            {target - p1Score > 0
              ? target - p1Score
              : 0}
            {" "}
            points
          </h3>

          <h3>
            🎯 {player2}
            {" "}
            needs
            {" "}
            {target - p2Score > 0
              ? target - p2Score
              : 0}
            {" "}
            points
          </h3>

        </div>

        <Achievements
          wins={currentWins}
          rolls={totalRolls}
        />

        <div className="history">

          <h2>
            📜 Recent Rolls
          </h2>

          {history.length === 0 ? (
            <p>No Rolls Yet</p>
          ) : (
            history
              .slice(-5)
              .reverse()
              .map(
                (item, index) => (
                  <p key={index}>
                    {player1}
                    {" : "}
                    {item.player1Roll}
                    {" | "}
                    {player2}
                    {" : "}
                    {item.player2Roll}
                  </p>
                )
              )
          )}

        </div>

        {winner && (

          <div className="winner-box">

            <h1>
              🎉🎉🎉
            </h1>

            <h2>
              🏆 {winner} Wins!
            </h2>

            <h3>
              Champion Of Dice Arena
            </h3>

            <button
              onClick={shareResult}
            >
              📤 Share Result
            </button>

            <button
              onClick={restartGame}
            >
              🔄 Play Again
            </button>

          </div>

        )}

      </div>
    </>
  );
}

export default Game; 
