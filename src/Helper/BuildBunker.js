import Bunker from '../Bunker/Bunker.js';
import Room from '../Bunker/Room.js';
import Item from '../Bunker/Item.js';

export function loadBunker(data) {
    let bunker = new Bunker();
    data.rooms.forEach(roomData => {
      const room = loadRoom(roomData, data.items)
      bunker.rooms.add(room)
    });
    bunker.completeLoad()
    return bunker
}


/**
 * @param roomData json room data
 * @param itemsData item json array
 */
function loadRoom(roomData, itemsData) {
    let room = new Room(roomData.name, roomData.description);
    room.northName = roomData.north;
    room.southName = roomData.south;
    room.eastName = roomData.east;
    room.westName = roomData.west;
    loadItem(roomData.item, itemsData);
    return room;
}

/**
 * @param itemName String item name
 * @param itemsData item json array
 * @return Item object
 */
function loadItem(itemName, itemsData) {
  if (!itemName) {
    return null
  }
  // Find item in itemsData
  const itemData = itemsData.find(item => item.name === itemName);
  if (!itemData) {
    return null;
  }
  let item = new Item();
  item.name = itemData.name;
  item.description = itemData.description;
  item.requiredItem = itemData.requiredItem;
  item.pickups = itemData.pickups;
  item.descAlreadyHave = itemData.descAlreadyHave;
  item.descItemNeeded = itemData.descItemNeeded;
  item.descItemPickup = itemData.descItemPickup;
  item.bacon = itemData.bacon;
  return item;
}