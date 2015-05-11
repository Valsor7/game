/**
 * Created by yaroslav on 02.05.15.
 */
var myMath = require('./myMath.js');
var Physics = require('./physics');

function Warrior(name, x, y, health, type, strength, armour, distance, cells) {
    this.name = name;
    this.position = new myMath.vector(x, y);
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

    return Math.round(dist);
};

Warrior.prototype.fight = function (enemy) {
    enemy.health-= this.strength-enemy.armour>0 ? this.strength-enemy.armour: 0;
    enemy.armour = enemy.armour - this.strength/4;
    console.log(this.name + ' attacked ' + enemy.name);
};

module.exports = Warrior;