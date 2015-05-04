/**
 * Created by yaroslav on 03.05.15.
 */
var vec = require('./vector');

function movement(x , y, hero) {

    var vecLength = new vec(x - hero.position.x, y - hero.position.y);
        hero.moveTo(vecLength);

    hero.position.x = x;
    hero.position.y = y;
    console.log(hero.name + " (" + hero.position.x + ";" + hero.position.y + ")");
};

module.exports = movement;