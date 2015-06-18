/**
 * Created by yaroslav on 10.05.15.
 */
var myMath = require('./myMath');

function fight(hero, model) {

    model.find().where("name").ne(hero.name).exec(function (err, hs) {
        if (err) return console.error(err);

        if(hs.length === 0) return console.log("only one hero exist");
        hs.forEach(function (enemy) {
            var dist = myMath.scalar(new myMath.vector(hero.x, hero.y), new myMath.vector(enemy.x, enemy.y));
            if (dist <= hero.distance) {
                hero.fight(enemy);

                var updateData = hero.poison ? {health: enemy.health, armour: enemy.armour, poison: hero.poison} : {health: enemy.health, armour: enemy.armour};

                model.update({name: enemy.name}, updateData, function (err, e) {
                    if (err) return console.error(err);
                });

                if (enemy.health > 0) {
                    console.log(enemy.name + " health = " + enemy.health);
                    return enemy;
                } else if (enemy.health <= 0) {
                    enemy.remove(function (err, e) {
                        if (err) return console.error(err);
                    });
                    console.log(hero.name + " defeated " + enemy.name);
                }
            } else {
                console.log("There are no enemies around");
            }

        });

    });
};
module.exports = fight;
