/**
 * Created by yaroslav on 10.05.15.
 */
var myMath = require('./myMath');
function fight(heroName) {
    var hero;
    global.heroes.forEach(function (e, i, a) {
        if (heroName === e.name) hero = e;
    });
        
    global.heroes.forEach(function (enemy, index, array) {
        if (!(hero.name === enemy.name)) {
            
            var dist = myMath.scalar(hero.position, enemy.position);
            if(dist <= hero.distance){
                hero.fight(enemy);
                if(enemy.health>0) console.log(enemy.name + " health = " + enemy.health);
            } else {console.log("There are no enemies around");}
            if(enemy.health <= 0){
                global.heroes.splice(index,1);
                console.log(hero.name + " defeated " + enemy.name);
            }
        } 
    });
};
module.exports = fight;