import {Pokemon} from "./Pokemon";
import "./App.css";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <nav className="navbar">
        <h2>Pokédex</h2>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>

      <Pokemon />
    </div>
  );
}

export default App;
