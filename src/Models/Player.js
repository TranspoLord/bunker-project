export default class Player {
  room
  constructor(name, health, energy, inventory, bacon) {
    this.name = name;
    this.health = health;
    this.energy = energy;
    this.inventory = inventory;
    this.bacon = bacon;
    this.room = null;
  }

  getRoom() {
    return this.room
  }

  pickupItem(item) {
    if (item.canPickUp(this.inventory)) {
      this.inventory.push(item)
      return true;
    }
    return false;
  }

  getInventory() {
    return this.inventory
  }

  inInventory(item) {
    if(this.inventory.includes(item)) {
      return true;
    }
    return false;
  }  
}