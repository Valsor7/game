var express = require('express');
var charsRouter = express.Router();
var warrior = require('../modules/warrior.js');
var paladin = require('../modules/paladin.js');
var heroes = [];
var err;

charsRouter.param('charName', function (req, res, next, name) {
    console.log("NAME!");

    if (heroExist(name)) {
        err = new Error("Hero with this name already exist");
        err.status = 400; // CHANGE Status!
        next(err);
    } else {
        req.name = name;
        next();
    }
})

charsRouter.post('/warrior/:charName', function (req, res, next ) {
    var warrName = req.name;

    heroes.push(new warrior(warrName, 10, 20, 100, 'Damage dealer', 50, 30, 30, 5));
    global.heroes = heroes;

    res.status(200).send("created warrior " + warrName);
});

charsRouter.post('/paladin/:charName', function (req, res, next) {
    var palName = req.name;

    heroes.push(new paladin(palName, 400, 300, 200, "Tank", 80, 20, 40, 10, "White", "God's scroll"));
    global.heroes = heroes;

    res.status(200).send("created paladin " + palName);
});

function heroExist(name) {
    var isHero = false;
    heroes.forEach(function (elem, index, arr) {
        if (name === elem.name) {
            isHero = true;
            return;
        };
    });

    return isHero;
}

module.exports = charsRouter;