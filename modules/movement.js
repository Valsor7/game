/**
 * Created by yaroslav on 03.05.15.
 */
var searchWay = require('./algorithm_way.js');
var myMath = require('./myMath.js');
var HeroModel = require('../models/hero.js');

module.exports.moveFirst = function (hero, x, y) {

    var endPos = new myMath.vector(Number(x),Number(y));
    var heroPos = new myMath.vector(hero.x,hero.y);

    var moveProps = hero.moveTo(searchWay(heroPos, endPos), 0);

    HeroModel.update({name: hero.name}, {x: hero.x, y: hero.y, way: moveProps.way, turn: moveProps.turn},
        function (err, hero) {
            if (err) return console.error(err);
            console.log("update coords success", hero);
    });
    return moveProps.logging;
};

module.exports.move = function (hero) {
    var moveProps = hero.moveTo(hero.way, hero.turn);

    if(!moveProps.isEnd) {
        HeroModel.update({name: hero.name}, {x: hero.x, y: hero.y, turn: moveProps.turn}, function (err, h) {
            if (err) return console.error(err);
        });

    } else{
        HeroModel.update({name: hero.name}, {x: hero.x, y: hero.y, turn: null, way: null}, function (err, h) {
            if (err) return console.error(err);
        });
    }
};