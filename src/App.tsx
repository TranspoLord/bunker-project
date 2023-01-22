import React, {useState} from 'react';
import './App.css';
import GameManager from "./GameManager"

function App() {
  const [debug, setDebug] = useState(false)
  const [startGame, setStartGame] = useState(false)
  
  return (
    <div className="App">
      {
        !startGame ?
          <div>
            <button onClick={
              () => {setStartGame(!startGame)}
            } className = "startButton">
              Start Game
            </button>
            <p>Start Game: {startGame ? "True" : "False"}</p>
            <button onClick={
              () => {setDebug(!debug)}
            } className="debugButton">
              Set Debug Outputs
            </button>
            <p>Debug state: {debug ? "True" : "False"}</p>
          </div>
          : <GameManager />
      }
    </div>
  );
}

export default App;
