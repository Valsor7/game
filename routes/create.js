var express = require('express');
var charsRouter = express.Router();
var WarriorModel = require('../models/warrior.js');
var PaladinModel = require('../models/paladin.js');
var bodyParser = require('body-parser');

charsRouter.use(bodyParser.urlencoded({ extended: false }));

charsRouter.use(bodyParser.json());

//Json object
//{
//    "name": "HeroName",
//    "x": 100,
//    "y": 50,
//    "health": 200,
//    "type": "Damage dealer",
//    "strength": 40,
//    "armour": 30,
//    "distance": 30,
//    "maxCells": 10,
//}
charsRouter.use('/', function (req, res, next) {
    WarriorModel.findOne({'name': req.body.name}, function (err, w) {
        if (err) return console.error(err);

        PaladinModel.findOne({'name': req.body.name}, function (err, p) {
            if (err) return console.error(err);

            if (p || w) return next(new Error("already exist"));
            next();
        });
    });
});
charsRouter.post('/warrior', function (req, res, next ) {

    var warrior = new WarriorModel(req.body);

    warrior.save(function (err, w) {
        if(err) return console.error(err);
        res.status(200).send("created warrior " + w);
    });
});

//Json object
//{
//    "name": "HeroName",
//    "x": 100,
//    "y": 50,
//    "health": 200,
//    "type": "Damage dealer",
//    "strength": 40,
//    "armour": 30,
//    "distance": 30,
//    "maxCells": 10,
//    "poison" : {
//    "number" : 5,
//        "power" : 7
//},
//    "artifact" : "God's scroll"
//}
charsRouter.post('/paladin', function (req, res, next) {
    var paladin = new PaladinModel(req.body);

    paladin.save(function (err, p) {
        if(err) return console.error(err);
        res.status(200).send("created paladin " + p);
    });
});

module.exports = charsRouter;