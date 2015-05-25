var express = require('express');
var charsRouter = express.Router();
var WarriorModel = require('../models/warrior.js');
var WarriorModule = require('../modules/warrior.js');
var PaladinModel = require('../models/paladin.js');
var PaladinModule = require('../modules/paladin.js');
var heroes = [];
var err;

charsRouter.post('/warrior/:charName', function (req, res, next ) {
    var warrName = req.params.charName;
    var warriorModule = new WarriorModule(warrName, 200, 300, 100, 'Damage dealer', 50, 30, 30, 5);
    var warrior = new WarriorModel(warriorModule);
    warrior.save(function(err, warrior) {
        if (err) return console.error(err);
        console.log(warrior);
    });

    heroes.push(warriorModule);
    global.heroes = heroes;

    res.status(200).send("created warrior " + warrior);
});

charsRouter.post('/paladin/:charName', function (req, res, next) {
    var palName = req.params.charName;
    var palModule = new PaladinModule(palName, 100, 50, 200, 'Tank', 40, 30, 30, 10, "God's scroll")
    var paladin = new PaladinModel(palModule);
    paladin.save(function(err, paladin) {
        if (err) return console.error(err);
        console.log(paladin);
    });

    heroes.push(palModule);
    global.heroes = heroes;

    res.status(200).send("created paladin " + paladin);
});

module.exports = charsRouter;