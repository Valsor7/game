/**
 * Created by yaroslav on 10.05.15.
 */
var myMath = require('./myMath');
var WarriorModel = require('../models/warrior.js');
var PaladinModel = require('../models/paladin.js');

function fight(hero) {
    WarriorModel.find().where("name").ne(hero.name).exec(function (err, ws) {
        if (err) return console.error(err);

        PaladinModel.find().where("name").ne(hero.name).exec(function (err, ps) {
            if (err) return console.error(err);
            var heroes = ws.concat(ps);
            if(heroes.length === 0) return console.log("only one hero exist");
            heroes.forEach(function (enemy, i, a) {
                var dist = myMath.scalar(new myMath.vector(hero.x, hero.y), new myMath.vector(enemy.x, enemy.y));
                if (dist <= hero.distance) {
                    hero.fight(enemy);
                    console.log(enemy.armour);
                    WarriorModel.update({name: enemy.name}, {health: enemy.health, armour: enemy.armour}, function (err, e) {
                        if (err) return console.error(err);
                    });
                    PaladinModel.update({name: enemy.name}, {health: enemy.health, armour: enemy.armour}, function (err, e) {
                        if (err) return console.error(err);
                    });
                    if(hero.poison){
                        PaladinModel.update({name: hero.name}, {poison: hero.poison}, function (err, e) {
                            if (err) return console.error(err);
                        });
                    }
                    if (enemy.health > 0) console.log(enemy.name + " health = " + enemy.health);
                } else {
                    console.log("There are no enemies around");
                }
                if (enemy.health <= 0) {
                    enemy.remove(function (err, e) {
                        if (err) return console.error(err);
                    });
                    console.log(hero.name + " defeated " + enemy.name);
                }
            });
        });
    });

};
module.exports = fight;