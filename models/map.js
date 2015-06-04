/**
 * Created by yaroslav on 03.06.15.
 */
/**
 * Created by yaroslav on 22.05.15.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MapSchema = new Schema({
    name : {type: String, required: true},
    way : [],
    turn : Number
});

var Map = mongoose.model('map', MapSchema);

module.exports = Map;