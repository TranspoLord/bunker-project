
import React, {useState, useEffect } from 'react';
import './App.css';
import data from './Test.json'

const GameManager = () => {
  const [roomName, setRoomName] = useState("Entrance")
  const [command, setCommand] = useState("")
  const [outputs, setOutputs] = useState([])

  function addOutput(output) {
    setOutputs([...outputs, output])
  }

  function doCommand() {
    const room = data[roomName]
    // Check for valid command
    if (room[command] && room[command] != "NA" && room[command] != "N") {
      console.log("valid command")
      // Check movements
      if (["East", "West", "North", "South"].includes(command)) {
        addOutput(`Heading ${command}`)
        setRoomName(room[command])
        setCommand("")
      }
    }
  }

  return (
    <div>
      <p>{roomName}</p>
      {
        outputs.map((output)=>{
          <p>
            {output}
          </p>
        })
      }
      <input value={command} onChange={(e) => setCommand(e.target.value)} />
      <button onClick={()=>{doCommand()}}>Submit</button>
    </div>
  )
}

export default GameManager;
