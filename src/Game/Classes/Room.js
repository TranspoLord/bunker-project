export default class Room {
    constructor(name, description, north, south, east, west, item) {
        this.name = name;
        this.description = description;
        this.north = north;
        this.south = south;; 
        this.east = east;
        this.west = west;
        this.item = item;
    }
}