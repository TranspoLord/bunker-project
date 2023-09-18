export default class Room {
    //Strings
    name

    regularDescription
    firstEnterDescription
    afterFirstEnterDescription

    north
    northName
    south
    southName
    east
    eastName
    west
    westName

    //Booleans
    finalRoom

    //Items
    removedItem
    item

    /**
     * @param name Name of room
     * @param regularDescription Description of room to help the level creator
     */
    constructor(name, regularDescription) {
        this.name = name;
        this.regularDescription = regularDescription;
    }

    //Strings: Getters and Setters
    setName(name) {
        this.name = name
    }

    setRegularDescription(regularDescription) {
        this.regularDescription = regularDescription;
    }

    setFirstEnterDescription(firstEnterDescription) {
        this.firstEnterDescription = firstEnterDescription;
    }

    setAfterFirstEnterDescription(afterFirstEnterDescription) {
        this.afterFirstEnterDescription = afterFirstEnterDescription;
    }

    getName() {
        return this.name;
    }

    getRegularDescription() {
        return this.regularDescription;
    }

    getFirstEnterDescription() {
        return this.firstEnterDescription;
    }

    getAfterFirstEnterDescription() {
        return this.afterFirstEnterDescription;
    }

    //Directional Rooms: Getters and Setters
    setNorth(north) {
        this.north = north;
    }

    setNorthName(northName) {
        this.northName = northName;
    }

    setSouth(south) {
        this.south = south;
    }

    setSouthName(southName) {
        this.southName = southName;
    }

    setEast(east) {
        this.east = east;
    }

    setEastName(eastName) {
        this.eastName = eastName;
    }

    setWest(west) {
        this.west = west;
    }

    setWestName(westName) {
        this.westName = westName;
    }

    getNorth() {
        return this.north;
    }

    getNorthName() {
        return this.northName;
    }

    getSouth() {
        return this.south;
    }

    getSouthName() {
        return this.southName;
    }

    getEast() {
        return this.east;
    }

    getEastName() {
        return this.eastName;
    }

    getWest() {
        return this.west;
    }

    getWestName() {
        return this.westName;
    }

    //Booleans: Getters and Setters
    setFinalRoom(finalRoom) {
        this.finalRoom = finalRoom;
    }

    getFinalRoom() {
        return this.finalRoom;
    }

    //Items: Getters and Setters
    setRemovedItem(removedItem) {
        this.removedItem = removedItem;
    }

    setItem(item) {
        this.item = item;
    }

    getRemovedItem() {
        return this.removedItem;
    }

    getItem() {
        return this.item;
    }

    




}