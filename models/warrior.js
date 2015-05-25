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

var Warrior = mongoose.model('warrior', WarriorSchema);

module.exports = Warrior;