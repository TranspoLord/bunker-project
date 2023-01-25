import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {

  return (
    <div>
      <Link to="/game">
        <button className="startButton">
          Start Game
        </button>
      </Link>

      <Link to="/manage">
        <button className="manageButton">
          Manage Bunkers
        </button>
      </Link>
      
      {/* <button onClick={
        () => { setDebug(!debug) }
      } className="debugButton">
        Set Debug Outputs
      </button>
      <p>Debug state: {debug ? "True" : "False"}</p> */}
    </div>
  )
}

export default Home;