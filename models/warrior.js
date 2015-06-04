/**
 * Created by yaroslav on 22.05.15.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WarriorSchema = new Schema({
    name: {type: String, required: true},
    x : Number,
    y : Number,
    health : {type: Number, required: true},
    type : String,
    strength : {type: Number, required: true},
    armour : {type: Number, default: 0},
    distance : {type: Number, required: true},
    maxCells : {type: Number, required: true}
});

WarriorSchema.methods.moveTo = function (way, turn) {

    var length = way.length;
    var finalPos;
    var isEnd = false
    length -= turn === 0 ? 0 : this.maxCells*(turn);

    if(length <= this.maxCells){
        finalPos = way[way.length-1];
        this.x = finalPos.x;
        this.y = finalPos.y;
        isEnd = true;
        console.log(this.name + " moved to final " + this.x + "_" + this.y);

        return {turn: turn, isEnd: isEnd, way: way};
    } else {
        finalPos = way[this.maxCells*(turn+1)-1];
        this.x = finalPos.x;
        this.y = finalPos.y;
        turn++;
        console.log(this.name + " moved to " + this.x + "_" + this.y);

        return {turn: turn, isEnd: isEnd, way: way};
    }
};

WarriorSchema.methods.fight = function (enemy) {
    enemy.health-= this.strength-enemy.armour>0 ? this.strength-enemy.armour: 0;
    enemy.armour = enemy.armour - this.strength/4;
    console.log(this.name + ' attacked ' + enemy.name);
};

var Warrior = mongoose.model('warrior', WarriorSchema);

module.exports = Warrior;