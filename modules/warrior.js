/**
 * Created by yaroslav on 02.05.15.
 */
var Vec = require('./vector.js');
var Physics = require('./physics');

function Warrior(name, x, y, health, type, strength, armour, distance, cells) {
    this.name = name;
    this.position = new Vec(x, y);
    this.health  = health;
    this.type = type;
    this.strength = strength;
    this.armour = armour;
    this.distance = distance;
    this.maxCells = cells;
}

Warrior.prototype.moveTo = function () {
    var dist = this.maxCells + Physics.wind;
    dist *=Physics.air;

    return dist;
};

Warrior.prototype.fight = function (enemy) {
    enemy.health-= this.strength-enemy.armour>0 ? this.strength-enemy.armour: 0;
    console.log(this.name + ' attack');
};

module.exports = Warrior;