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

}