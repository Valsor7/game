/**
 * Created by yaroslav on 03.05.15.
 */
var warrior = require('./warrior');
function Paladin(name, health, type, strength, distance, armour,scin,artifact) {
    warrior.apply(this, arguments);
    this.poison = {
        number: 3,
        power : 5
    };
    this.scin = scin;
    this.artifact = artifact;
}

Paladin.prototype = new warrior();
Paladin.prototype.teleport = function (x,y) {
    this.x = x;
    this.y = y;
};
Paladin.prototype.fight = function (enemy) {
    enemy.health-= this.strength-enemy.armour>0 ? this.strength-enemy.armour: 0;
    this.poison.number>0 ? enemy.health-= this.poison.power: enemy.health-=0;

    this.poison.number--;
};

module.exports = Paladin;