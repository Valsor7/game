/**
 * Created by yaroslav on 03.05.15.
 */
var searchWay = require('./algorithm_way.js');
var myMath = require('./myMath.js');
var MapModel = require('../models/map.js');
var WarriorModel = require('../models/warrior.js');
var PaladinModel = require('../models/paladin.js');

module.exports.moveFirst = function (hero, x, y) {

    var endPos = new myMath.vector(Number(x),Number(y));
    var heroPos = new myMath.vector(hero.x,hero.y);

    var moveProps = hero.moveTo(searchWay(heroPos, endPos), 0);
    var map = new MapModel({name: hero.name, way: moveProps.way, turn: moveProps.turn});
    map.save(function (err, m) {
        if (err) return console.error(err);
        console.log(m);
    });

    if(hero.type === "Tank")  WarriorModel.update({name: hero.name}, {x: hero.x, y: hero.y}, function (err, hero) {
        if (err) return console.error(err);
        console.log("update coords success", hero);
    });
    else PaladinModel.update({name: hero.name}, {x: hero.x, y: hero.y}, function (err, hero) {
        if (err) return console.error(err);
        console.log("update coords success", hero);
    });

};

module.exports.move = function (hero, map) {
    var moveProps = hero.moveTo(map.way, map.turn);// return arr of turn n isEnd

    if(!moveProps.isEnd) {
        MapModel.update({name: hero.name}, {turn: moveProps.turn}, function (err, way) {
            if (err) return console.error(err);
        });

    } else{
        map.remove(function (err, m) {
            if (err) return console.error(err);
        });
    }
    if(hero.type === "Tank")  WarriorModel.update({name: hero.name}, {x: hero.x, y: hero.y}, function (err, hero) {
        if (err) return console.error(err);
        console.log("update coords success", hero);
    });
    else PaladinModel.update({name: hero.name}, {x: hero.x, y: hero.y}, function (err, hero) {
        if (err) return console.error(err);
        console.log("update coords success", hero);
    });
};