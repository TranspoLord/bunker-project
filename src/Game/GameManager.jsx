import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import Player from './Classes/Player';
import Room from './Classes/Room';
import Item from './Classes/Item';
import Bunker from './Classes/Bunker';

const GameManager = () => {
  const { name } = useParams();
  const bunker = JSON.parse(localStorage.getItem("bunker-" + name));

  useEffect(() => {
    console.log("GameManager mounted");
    BuildBunker(bunker);

    return () => {
      console.log("GameManager unmounted");
    };

  }, []);

  
  const player = new Player();

// HandleKeyDown, HandleTextInput, and HandleTextValidation are all used to handle the input from the user
  const [value, setValue] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log("Entered value: ", value);
      GameLogic(event.target.value);
      setValue("");
    }
  };
  const handleTextInput = (event) => {
    setValue(event.target.value);
  };
  const handleTextValidation = (data) => {
    const validMovementCommands = ["North", "South", "East", "West", "Help"];
    const validDefaultCommands = ["Pickup", "Pick up", "Pickup Item"]

    let itemNameCurRoom = bunker.rooms[player.location].item;
    let validActionCommands = [];

    if (itemNameCurRoom != "None") {
      if (itemNameCurRoom.defaultPickup) {
        validActionCommands = bunker.items[itemNameCurRoom].pickups;
        validActionCommands = validActionCommands.concat(validDefaultCommands);
      }
    } else { 
      validActionCommands = validDefaultCommands;
      console.log("No item in room");
    }
    
    let totalCommands = validMovementCommands + validActionCommands;
    const regex = new RegExp(data);
    if (regex.test(totalCommands)) {
      console.log("Valid command");
      return true;
    } else {
      console.log("Invalid command");
      return false;
    }
  };

// BuildBunker is used to build the bunker from the JSON file
  const BuildBunker = (data) => {
    let bunker = new Bunker();
    console.log("Bunker: ", data);
    console.log("Rooms: ", data.rooms);
    let amountRooms = data.rooms.length;
    let item = null;
    
    for (let i = 0; i < amountRooms; i++) {
      if(data.rooms[i].item != "None") {
        console.log("Trying to create item: " + data.rooms[i].item);
        for(let j = 0; j < data.items.length; j++) {
          if(data.items[j].name == data.rooms[i].item) {
            console.log("Found item: " + data.items[j].name);
            console.log("Data for item: " + data.items[j].name + " is: " + data.items[j].description + ", " + data.items[j].requiredItem + ", " + data.items[j].pickups + ", " + data.items[j].descAlreadyHave + ", " + data.items[j].descItemNeeded + ", " + data.items[j].descItemPickup + ", " + data.items[j].baconItem)
            item = new Item(data.items[j].name, data.items[j].description, data.items[j].requiredItem, data.items[j].pickups, data.items[j].descAlreadyHave, data.items[j].descItemNeeded, data.items[j].descItemPickup, data.items[j].baconItem);
          }
        }
        console.log("Item for room: \"" + data.rooms[i].name + "\" is: \"" + item.name + "\"");
      }
      const newItem = item;
      const room = new Room(data.rooms[i].name, data.rooms[i].north, data.rooms[i].south, data.rooms[i].west, data.rooms[i].south, data.rooms[i].description, newItem);
      if(!bunker.rooms) {
        bunker.rooms = [];
      }
      bunker.rooms.push(room);
    }
    console.log("Bunker: ", bunker);
  }

// GameLogic is the main function that handles the game...logic
  const GameLogic = (props) => {
    let curRoom = bunker.rooms[player.location];
    let curRoomName = curRoom.name;
    console.log("Current room: ", curRoomName);
    if (handleTextValidation(props)) {
      console.log("Valid command - GameLogic");
    }
    else {
      console.log("Invalid command - GameLogic");
    }
  };

  return (
    <div>
      <h2>{bunker.rooms[0].name}</h2>
      <h4>{bunker.rooms[0].description}</h4>
      <div>*********</div>
      <h3>What do you do?</h3>
      <input type="text"
        onKeyDown={handleKeyDown}
        onChange={handleTextInput}
        value={value} />
    </div>
  );
};

export default GameManager;
