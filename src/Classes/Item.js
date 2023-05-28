export default class Item {
    constructor(name, description, requiredItem, pickups, descAlreadyHave, descItemNeeded, descItemPickup, bacon) {
        this.name = name;
        this.description = description;
        this.requiredItem = requiredItem;
        this.pickups = pickups;
        this.descAlreadyHave = descAlreadyHave;
        this.descItemNeeded = descItemNeeded
        this.descItemPickup = descItemPickup;
        this.bacon = bacon;
    }
}