import React, {useState} from 'react';
import './App.css';
import GameManager from "./GameManager"
import BunkerManager from "./BunkerManager"

function App() {
  const [debug, setDebug] = useState(false)
  const [startGame, setStartGame] = useState(false)
  const [bunkerManager, setBunkerManager] = useState(false)

  function buttonDesicsion() {
    if(startGame){
      return <GameManager />
    }
    else if(bunkerManager){
      return <BunkerManager />
    }
    else{
      return (
        <div>
            <button onClick={
              () => {setStartGame(!startGame)}
            } className = "startButton">
              Start Game
            </button>
            <p>Start Game: {startGame ? "True" : "False"}</p>

            <button onClick = {
              () => {setBunkerManager(!bunkerManager)}
            } className = "bunkerMButton">
              Manage Bunkers
              </button>
            <p>Bunker Manager: {bunkerManager ? "True" : "False"}</p>

            <button onClick={
              () => {setDebug(!debug)}
            } className="debugButton">
              Set Debug Outputs
            </button>
            <p>Debug state: {debug ? "True" : "False"}</p>
          </div>
      )
    }
  }

  return (
    <div className="App">
      {buttonDesicsion()}
    </div>
  )
}

export default App;
