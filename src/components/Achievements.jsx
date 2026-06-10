function Achievements({ wins, rolls }) {
  return (
    <div className="achievements">
      <h2>🏅 Achievements</h2>

      {wins >= 1 && (
        <p>🥉 First Victory Unlocked</p>
      )}

      {wins >= 5 && (
        <p>🥈 Champion Unlocked</p>
      )}

      {wins >= 10 && (
        <p>🥇 Dice Master Unlocked</p>
      )}

      {rolls >= 25 && (
        <p>🎲 Dice Roller Unlocked</p>
      )}

      {rolls >= 50 && (
        <p>🔥 Roller Pro Unlocked</p>
      )}

      {rolls >= 100 && (
        <p>👑 Dice Legend Unlocked</p>
      )}

      {wins === 0 && rolls === 0 && (
        <p>No achievements yet.</p>
      )}
    </div>
  );
}

export default Achievements;