/**
 * Created by yaroslav on 02.05.15.
 */
var Vec = require('./vector.js');
var Physics = require('./physics');

function Warrior(name, x, y, health, type, strength, armour, distance) {
    this.name = name;
    this.position = new Vec(x, y);
    this.health  = health;
    this.type = type;
    this.strength = strength;
    this.armour = armour;
    this.distance = distance;
}

Warrior.prototype.moveTo = function (vecLength) {

    if(vecLength.x > 0) {
        this.position.x += this.distance + Physics.wind.windX;
    } else {
        this.position.x -= this.distance + Physics.wind.windX;
    };

    if(vecLength.y > 0) {
        this.position.y += this.distance + Physics.wind.windX;
    } else {
        this.position.y -= this.distance + Physics.wind.windX;
    };

    this.position.x*=Physics.air;
    this.position.y*=Physics.air;

    console.log(this.name + " move to(" + this.position.x + ";" + this.position.y + ")");

};

Warrior.prototype.fight = function (enemy) {
    enemy.health-= this.strength-enemy.armour>0 ? this.strength-enemy.armour: 0;
};

module.exports = Warrior;