/**
 * Created by yaroslav on 02.05.15.
 */
var myMath = require('./myMath.js');

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

Warrior.prototype.moveTo = function (way) {

    var length = way.length;
    var turn = global.turn || 1;

    length -= turn === 1 ? 0 : this.maxCells*(turn-1);

    if(length <= this.maxCells){
        this.position = way[way.length-1];
        console.log(this.name + " moved to final" + this.position.x + "_" + this.position.y);
    } else {
        this.position = way[this.maxCells*turn-1];
        turn++;
        global.turn = turn;

        console.log(this.name + " moved to " + this.position.x + "_" + this.position.y);
    }
};

Warrior.prototype.fight = function (enemy) {
    enemy.health-= this.strength-enemy.armour>0 ? this.strength-enemy.armour: 0;
    enemy.armour = enemy.armour - this.strength/4;
    console.log(this.name + ' attacked ' + enemy.name);
};

module.exports = Warrior;