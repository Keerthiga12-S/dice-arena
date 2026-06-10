import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import LeaderBoard from "./pages/LeaderBoard";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import "./App.css";
import PlayerSetup from "./pages/PlayerSetup";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />}/>
        <Route path="/setup" element={<PlayerSetup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;