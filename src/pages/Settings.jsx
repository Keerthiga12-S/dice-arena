import { useState } from "react";

function Settings() {

  const [dark, setDark] =
    useState(false);

  const toggleTheme = () => {

    document.body.classList.toggle(
      "dark"
    );

    setDark(!dark);
  };

  const resetData = () => {

    localStorage.clear();

    alert(
      "All game data deleted successfully!"
    );

    window.location.reload();
  };

  return (
    <div className="page">

      <h1>⚙ Settings</h1>

      <div className="card">

        <button
          onClick={toggleTheme}
        >
          {dark
            ? "☀ Light Mode"
            : "🌙 Dark Mode"}
        </button>

        <br />
        <br />

        <button
          onClick={resetData}
        >
          🗑 Reset All Data
        </button>

      </div>

    </div>
  );
}

export default Settings;