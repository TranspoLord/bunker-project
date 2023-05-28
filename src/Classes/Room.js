export default class Room {
    name
    description
    north
    northName
    south
    southName
    east
    eastName
    west
    westName

    removedItem
    item

    /**
     * @param name Name of room
     * @param description Description of room
     */
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    setItem(item) {
        this.item = item
    }

    setEastRoom(room) {
        this.east = room
    }
    setWestRoom(room) {
        this.west = room
    }
    setNorthRoom(room) {
        this.north = room
    }
    setSouthRoom(room) {
        this.south = room
    }



    getName() {
        return this.name
    }

    getItem() {
        return this.item
    }
    
    getRemovedItem() {
        return this.removedItem
    }

    removeItem() {
        this.removedItem = this.item;
        this.item = null
    }

}