import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import Player from '../Classes/Player';
import { loadBunker } from "../Helper/BuildBunker"

const GameManager = () => {
  const { name } = useParams();
  const [bunker, setBunker] = useState(null);
  const [update, setUpdate] = useState(0);
  const roomInput = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const text = roomInput.current.value.toLowerCase().trim();
    console.log("Command: ", text);
    const room = bunker.player.getRoom();
    const item = room.getItem()

    const pickups = item?.pickups?.reduce((prev, curr) => {
      prev[curr.toLowerCase()] = () => {
        const successful = bunker.player.pickupItem(item);
        if (successful) {
          room.removeItem()
        }
        return successful;
      }
      return prev;
    }, {});

    const removedItem = room.getRemovedItem();
    const alreadyHaves = removedItem?.pickups?.reduce((prev, curr) => {
      prev[curr.toLowerCase()] = () => {
        console.log(item.descAlreadyHave);
      }
      return prev;
    }, {});
    
    const commands = {
      north: () => bunker.north(),
      east: () => bunker.east(),
      south: () => bunker.south(),
      west: () => bunker.west(),
      ...pickups,
      ...alreadyHaves,
    };
    
    if (commands[text]) {
      const result = commands[text]();
      if (result) {
        console.log(result)
      } else console.log('action failed!')
    }
    else console.log('invalid command')

    roomInput.current.value = '';
    setUpdate(update + 1)
  }
 
  useEffect(() => {
    console.log("GameManager initial run");
    const JSONbunker = JSON.parse(localStorage.getItem("bunker-" + name));
    let _bunker = loadBunker(JSONbunker);
    _bunker.player = new Player("Player", 100, 100, [], false);
    _bunker.spawnPlayer()
    setBunker(_bunker)
    console.log("Bunker - HasRun", _bunker)
  }, [])

  // Don't render before we loaded the bunker
  if (!bunker) {
    return (<div></div>)
  }

  return (
    <div>
      
      <h2>{bunker.player.room.name}</h2>
      <div>{bunker.player.room.description}</div>
      <div>{bunker.player.room.item?.description}</div>
      <div>*********</div>
      <h4>Inventory</h4>
      
      {
        bunker.player.inventory.map(item => 
          <div
          key={item.name}>
            <h5>{item.name}</h5>
          </div>
          )
      }

      <div>*********</div>
      <div>
        actions that you do in the room
      </div>
      <div>*********</div>
      <h3>What do you do?</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={roomInput}/>
      </form>
      
    </div>
  );
};

export default GameManager;
