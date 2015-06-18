/**
 * Created by yaroslav on 22.05.15.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HeroSchema = new Schema({
    name: {type: String, required: true, unique: true},
    x : Number,
    y : Number,
    health : {type: Number, required: true},
    type : String,
    strength : {type: Number, required: true},
    armour : {type: Number, default: 0},
    distance : {type: Number, required: true},
    maxCells : {type: Number, required: true},
    way : [],
    turn : Number,
    poison : {
        number: {type: Number},
        power : {type: Number}
    },
    artifact : String
});

HeroSchema.methods.moveTo = function (way, turn) {
    var length = way.length;
    var finalPos;
    var isEnd = false;
    length -= this.maxCells*(turn);

    if(length <= this.maxCells){
        if(length>0) {
            finalPos = way[way.length - 1];
            this.x = finalPos.x;
            this.y = finalPos.y;
        }
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

HeroSchema.methods.fight = function (enemy) {

    enemy.health-= this.strength-enemy.armour>0  ? this.strength-enemy.armour: 0;

    enemy.armour -= enemy.armour>0 ? this.strength/4: 0;

    if(enemy.armour<0) enemy.armour=0;


    if(this.poison){
        if(this.poison.number > 0) {
            enemy.health -= this.poison.power;
            --this.poison.number;
        }
    }

    console.log(this.name + ' attacked ' + enemy.name);
};

module.exports = mongoose.model('hero', HeroSchema);