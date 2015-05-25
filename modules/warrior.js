/**
 * Created by yaroslav on 02.05.15.
 */
var myMath = require('./myMath.js');

function Warrior(name, x, y, health, type, strength, armour, distance, cells) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.health  = health;
    this.type = type;
    this.strength = strength;
    this.armour = armour;
    this.distance = distance;
    this.maxCells = cells;
}

Warrior.prototype.moveTo = function (way) {

    var length = way.length;
    var turn = global.turn || 1;
    var finalPos;
    length -= turn === 1 ? 0 : this.maxCells*(turn-1);

    if(length <= this.maxCells){
        finalPos = way[way.length-1];
        this.x = finalPos.x;
        this.y = finalPos.y;

        delete global.turn;
        delete global.way;

        console.log(this.name + " moved to final" + this.x + "_" + this.y);
    } else {
        finalPos = way[this.maxCells*turn-1];
        this.x = finalPos.x;
        this.y = finalPos.y;
        turn++;
        global.turn = turn;

        console.log(this.name + " moved to " + this.x + "_" + this.y);
    }
};

Warrior.prototype.fight = function (enemy) {
    enemy.health-= this.strength-enemy.armour>0 ? this.strength-enemy.armour: 0;
    enemy.armour = enemy.armour - this.strength/4;
    console.log(this.name + ' attacked ' + enemy.name);
};

module.exports = Warrior;