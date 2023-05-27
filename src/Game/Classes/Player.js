export default class Player {
  constructor(name, health, energy, inventory, location, bacon) {
    this.name = name;
    this.health = health;
    this.energy = energy;
    this.inventory = inventory;
    this.location = location; //{x:0, y:0}  
    this.bacon = bacon;
  }
}