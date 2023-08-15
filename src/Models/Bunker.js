import { FormatQuote } from "@mui/icons-material";

export default class Bunker {
    // Array of Rooms
    room
    constructor(finalRoom, currentRoom, player) {
        this.finalRoom = finalRoom;
        this.player = player;
        this.rooms = []
    }

    /**
     * Completes the room loading
     */
    completeLoad() {
        this.rooms.forEach(room => {
            room.setEastRoom(this.findRoom(room.eastName))
            room.setWestRoom(this.findRoom(room.westName))
            room.setNorthRoom(this.findRoom(room.northName))
            room.setSouthRoom(this.findRoom(room.southName))
        })
    }

    /**
     * Tests player inventory for all items
     * @return Boolean
     */
    testBaconInventory() {
        const requiredItems = this.rooms.reduce((allItems, room) => {
            if (room.item.bacon == true) allItems.push(room.item.name)
            return allItems;
        },[]);
        
        console.log(requiredItems);

        return requiredItems.length === 0;
    }


    /**
     * @param room Room
     */
    addRoom(room) {
        this.rooms.push(room)
    }

    /**
     * @param roomName String
     * @return Room
     */
    findRoom(roomName) {
        if (!roomName) {
            return null
        }
        return this.rooms.find(room => room.getName() === roomName)
    }


    spawnPlayer() {
        this.player.room = this.findRoom("Entrance");
    }

    north () {
        if (this.player.room.north) {
            this.player.room = this.player.room.north;
            return true;
        }
        return false;
    }

    east() {
        if (this.player.room.east) {
            this.player.room = this.player.room.east;
            return true;
        }
        return false;
    }

    south() {
        if (this.player.room.south) {
            this.player.room = this.player.room.south;
            return true;
        }
        return false;
    }

    west() {
        if (this.player.room.west) {
            this.player.room = this.player.room.west;
            return true;
        }
        return false;
    }

}