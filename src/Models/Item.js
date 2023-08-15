export default class Item {
    /**
     * @param name String
     * @param description String
     * @param requiredItem Item
     * 
     */
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

    canPickUp(inventory) {
        if (!this.requiredItem) {
            return true
        }
        var item = inventory.find(item => item.name.toLowerCase() === this.requiredItem.toLowerCase())
        return !!item
    }
}