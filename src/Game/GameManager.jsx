import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import Player from './Classes/Player';
import Room from './Classes/Room';
import Item from './Classes/Item';
import Bunker from './Classes/Bunker';
import { Build } from '@mui/icons-material';
import { loadBunker } from "../Helper/BuildBunker"

const GameManager = () => {
  const { name } = useParams();
  const [bunker, setBunker] = useState(null);
  let player = new Player("Player", 100, 100, [], "", false);

  // HandleKeyDown, HandleTextInput, and HandleTextValidation are all used to handle the input from the user
  const [value, setValue] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log("Entered value: ", value);
      debugger
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
      console.log("Valid command - Text Validation");
      return true;
    } else {
      console.log("Invalid command - Text Validation");
      return false;
    }
  };

  const searchByNameArray = (data, name) => {
    return data.find((element) => element.name.toLowerCase() === name.toLowerCase());
  };

  // BuildBunker is used to build the bunker from the JSON file
  /*
  const BuildBunker = (data) => {
    let bunker = new Bunker();
    //console.log("Bunker: ", data);
    //console.log("Rooms: ", data.rooms);
    let amountRooms = data.rooms.length;
    let item = null;

    for (let i = 0; i < amountRooms; i++) {
      if (data.rooms[i].item != "None") {
        console.log("Trying to create item: " + data.rooms[i].item);
        for (let j = 0; j < data.items.length; j++) {
          if (data.items[j].name == data.rooms[i].item) {
            console.log("Found item: " + data.items[j].name);
            //console.log("Data for item: " + data.items[j].name + " is: " + data.items[j].description + ", " + data.items[j].requiredItem + ", " + data.items[j].pickups + ", " + data.items[j].descAlreadyHave + ", " + data.items[j].descItemNeeded + ", " + data.items[j].descItemPickup + ", " + data.items[j].baconItem)
            item = new Item(data.items[j].name, data.items[j].description, data.items[j].requiredItem, data.items[j].pickups, data.items[j].descAlreadyHave, data.items[j].descItemNeeded, data.items[j].descItemPickup, data.items[j].baconItem);
          }
        }
        console.log("Item for room: \"" + data.rooms[i].name + "\" is: \"" + item.name + "\"");
        console.log(" ");
      }
      const newItem = item;
      const room = new Room(data.rooms[i].name, data.rooms[i].description, data.rooms[i].north, data.rooms[i].south, data.rooms[i].east, data.rooms[i].west, newItem);
      if (!bunker.rooms) {
        bunker.rooms = [];
      }
      bunker.rooms.push(room);
    }
    return new Bunker(bunker.rooms, bunker.finalRoom, bunker.player);
  }
  */

  // GameLogic is the main function that handles the game...logic
  const GameLogic = (text) => {
    if (handleTextValidation(text)) {
      console.log("Valid command - GameLogic");
      text = text.toLowerCase();
      if (text == "north") {
        if (bunker.rooms[player.location].north != "") {
          bunker.player.location = bunker.rooms[bunker.player.location].north;
          console.log("Moved North");
        } else {
          console.log("Can't move North");
        }
      }
      else if (text == "south") {
        if (bunker.rooms[bunker.player.location].south != "") {
          bunker.player.location = bunker.rooms[bunker.player.location].south;
          console.log("Moved South");
        } else {
          console.log("Can't move South");
        }
      }
      else if (text == "east") {
        if (bunker.rooms[bunker.player.location].east != "") {
          bunker.player.location = bunker.rooms[bunker.player.location].east;
          console.log("Moved East");
        } else {
          console.log("Can't move East");
        }
      }
      else if (text == "west") {
        if (bunker.rooms[bunker.player.location].west != "") {
          bunker.player.location = bunker.rooms[bunker.player.location].west;
          console.log("Moved West");
        } else {
          console.log("Can't move West");
        }
      }
      else if (text == "help") {
        console.log("Help");
      }
      // Add Pickup Logic
      else {
        console.log("Invalid command - GameLogic");
      }
    }
    else {
      console.log("Invalid command - GameLogic");
    }
  };

  useEffect(() => {
    console.log("GameManager initial run");
    const JSONbunker = JSON.parse(localStorage.getItem("bunker-" + name));
    let _bunker = loadBunker(JSONbunker);
    _bunker.player = player;
    _bunker.player.location = _bunker.rooms[0].name;
    setBunker(_bunker)
    console.log("Bunker - HasRun", _bunker)
  }, [])

  // Don't render before we loaded the bunker
  if (!bunker) {
    return (<div></div>)
  }

  return (
    <div>
      <h2>{searchByNameArray(bunker.rooms, bunker.player.location).name}</h2>
      <div>{searchByNameArray(bunker.rooms, bunker.player.location).description}</div>
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
