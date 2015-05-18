/**
 * Created by yaroslav on 03.05.15.
 */
var searchWay = require('./algorithm_way');
var myMath = require('./myMath');

module.exports.moveFirst = function (hero, x, y) {

    var endPos = new myMath.vector(Number(x),Number(y));
    var heroPos = new myMath.vector(hero.position.x,hero.position.y);
    var way = searchWay(heroPos, endPos);
    global.way = way;
    hero.moveTo(way);
};

module.exports.move = function (hero) {
    hero.moveTo(global.way);
};


