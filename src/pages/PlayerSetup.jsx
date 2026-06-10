import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PlayerSetup() {

  const navigate = useNavigate();

  const [player1, setPlayer1] =
    useState("");

  const [player2, setPlayer2] =
    useState("");

  const [targetScore, setTargetScore] =
    useState(50);

  const [gameMode, setGameMode] =
    useState("multiplayer");

  const startGame = () => {

    if (!player1.trim()) {
      alert("Enter Player 1 Name");
      return;
    }

    if (
      gameMode === "multiplayer" &&
      !player2.trim()
    ) {
      alert("Enter Player 2 Name");
      return;
    }

    localStorage.setItem(
      "player1",
      player1
    );

    localStorage.setItem(
      "player2",
      gameMode === "computer"
        ? "Computer"
        : player2
    );

    localStorage.setItem(
      "targetScore",
      targetScore
    );

    localStorage.setItem(
      "gameMode",
      gameMode
    );

    navigate("/game");
  };

  return (
    <div className="page">

      <h1>🎮 Player Setup</h1>

      <div className="card">

        <h3>👤 Player 1</h3>

        <input
          type="text"
          placeholder="Enter Player 1 Name"
          value={player1}
          onChange={(e) =>
            setPlayer1(e.target.value)
          }
        />

        <br />
        <br />

        <h3>🎯 Game Mode</h3>

        <select
          value={gameMode}
          onChange={(e) =>
            setGameMode(e.target.value)
          }
        >
          <option value="multiplayer">
            👥 Multiplayer
          </option>

          <option value="computer">
            🤖 Computer
          </option>
        </select>

        <br />
        <br />

        {gameMode ===
          "multiplayer" && (
          <>
            <h3>👤 Player 2</h3>

            <input
              type="text"
              placeholder="Enter Player 2 Name"
              value={player2}
              onChange={(e) =>
                setPlayer2(
                  e.target.value
                )
              }
            />

            <br />
            <br />
          </>
        )}

        <h3>🎯 Target Score</h3>

        <input
          type="number"
          min="10"
          max="500"
          value={targetScore}
          onChange={(e) =>
            setTargetScore(
              Number(
                e.target.value
              )
            )
          }
        />

        <br />
        <br />

        <button
          onClick={startGame}
        >
          🚀 Start Game
        </button>

      </div>

    </div>
  );
}

export default PlayerSetup;