import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import Player from '../Classes/Player';
import { loadBunker } from "../Helper/BuildBunker"
import { Button } from "@mui/material";

const GameManager = () => {
  const { name } = useParams();
  const [bunker, setBunker] = useState(null);
  const roomInput = useRef();

  const [messages, setMessages] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const text = roomInput.current.value.toLowerCase().trim();
    console.log("Command: ", text);
    const room = bunker.player.getRoom();
    const item = room.getItem()

    //Move pickups to InventoryRender.jsx

    const pickups = item?.pickups?.reduce((prev, curr) => {
      prev[curr.toLowerCase()] = () => {
        const successful = bunker.player.pickupItem(item);
        if (successful) {
          room.removeItem()
          setMessages(prev => [...prev, item.descItemPickup])
        } else {
          setMessages(prev => [...prev, item.descItemNeeded])
        }
        return successful;
      }
      return prev;
    }, {});

    const removedItem = room.getRemovedItem();
    const alreadyHaves = removedItem?.pickups?.reduce((prev, curr) => {
      prev[curr.toLowerCase()] = () => {
        console.log(removedItem.descAlreadyHave);
        setMessages(prev => [...prev, removedItem.descAlreadyHave])
      }
      return prev;
    }, {});

    let defaultPickUp;
    if (!item?.pickups) {
      defaultPickUp = {
        "pickup": () => {
          console.log('pickup');
          setMessages(prev => [...prev, 'No Item Found!'])
        },
      }
    }

    const commands = {
      north: () => {
        bunker.north();
        setMessages([]);
      },
      east: () => {
        bunker.east();
        setMessages([]);
      },
      south: () => {
        bunker.south();
        setMessages([]);
      },
      west: () => {
        bunker.west();
        setMessages([]);
      },
      inventory: () => {
        setMessages(prev => [...prev, 
          'Inventory: ' +
          bunker.player.getInventory().map(i => i.name).join(', ')])
      },
      ...pickups,
      ...alreadyHaves,
      ...defaultPickUp,
    };

    if (commands[text]) {
      const result = commands[text]();
      if (result) {
        
      } else console.log('action failed!')
    }
    else console.log('invalid command')

    roomInput.current.value = '';
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
    return null;
  }

  return (
    <div>
      <Link to={`/gameSettings/${name}`}> 
      <Button variant="contained" color="primary">Exit</Button>
      </Link>
      <h2>{bunker.player.room.name}</h2>
      <div>{bunker.player.room.description}</div>
      <div>{bunker.player.room.item?.description}</div>
      {messages != "" ? '*********' : ''}
      {messages.map((m, index) => <div key={index}>{m}</div>)}
      <div>*********</div>
      <h3>What do you do?</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={roomInput} />
      </form>
    </div>
  );
};

export default GameManager;
