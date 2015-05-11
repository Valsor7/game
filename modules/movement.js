/**
 * Created by yaroslav on 03.05.15.
 */
var searchWay = require('./algorithm_way');
var myMath = require('./myMath');
function move(hero, x, y) {

    var endPos = new myMath.vector(Number(x),Number(y));
    var heroPos = new myMath.vector(hero.position.x,hero.position.y);
    var way = searchWay(heroPos, endPos);

    var maxDist = hero.moveTo();
    var passDist = 0;
    var turn = 1;

    for (var i = 0, l = way.length; i < l; i++) {
        passDist++;
        if(passDist < maxDist){
            hero.position.x = way[i].x;
            hero.position.y = way[i].y;
        } else {
            console.log(hero.name + " moved to " + hero.position.x + "_" + hero.position.y);
            var n = i;
            ++n;
            if(n === l){
                hero.position.x = way[i].x;
                hero.position.y = way[i].y;

                break;
            };

            maxDist = hero.moveTo();
            passDist = 0;
            console.log("turn " + turn++);
        }

    };
    console.log(hero.name + " moved to final " + hero.position.x + "_" + hero.position.y);
};



module.exports = move;
