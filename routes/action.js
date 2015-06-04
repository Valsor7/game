var express = require('express');
var WarriorModel = require('../models/warrior.js');
var PaladinModel = require('../models/paladin.js');
var MapModel = require('../models/map.js');
var actionRouter = express.Router();
var movement = require('../modules/movement.js');
var fight = require('../modules/fight.js');
var error = {};

actionRouter.get('/:name/fight', function (req, res, next) {
    var heroName = req.params.name;

    WarriorModel.findOne({'name': heroName}, function (err, w) {
        if (err) return console.error(err);
        if (w) {
            new fight(w);
            res.status = 200;
            res.send(w.name + " warrior is fighting");
        } else {
            PaladinModel.findOne({'name': heroName}, function (err, p) {
                if (err) return console.error(err);
                if (p) {
                    new fight(p);
                    res.status = 200;
                    res.send(p.name + " paladin is fighting");
                } else {

                    err = new Error("Hero doesn't exist");
                    err.status = 400;
                    next(err)
                }
            });
        }
    });
});

actionRouter.get('/:name/move/:x/:y', function (req, res, next) {
    var heroName = req.params.name;
    var x = req.params.x;
    var y = req.params.y;
    MapModel.findOne({name: heroName}, function (err, m) {
        if (err) return console.error(err);
        if(m){
            res.status = 200;
            res.send("use URL: action/heroName/move");
        } else {
            WarriorModel.findOne({'name': heroName}, function (err, w) {
                if (err) return console.error(err);

                PaladinModel.findOne({'name': heroName}, function (err, p) {
                    if (err) return console.error(err);
                    if (w){
                        new movement.moveFirst(w, x, y);
                        res.status = 200;
                        res.send("current Coord: " + w.x + " " + w.y);
                    } else if (p){
                        new movement.moveFirst(p, x, y);
                        res.status = 200;
                        res.send("current Coord: " + p.x + " " + p.y);
                    } else{
                        err = new Error("Hero doesn't exist");
                        err.status = 400;
                        next(err)
                    }
                });
            });

        }
    });
});

actionRouter.get('/:name/move', function (req, res, next) {
    var heroName = req.params.name;
    MapModel.findOne({name: heroName}, function (err, m) {
        if (err) return console.error(err);
        if (!m) {
            res.status = 200;
            res.send("use URL: /heroName/move/x/y");
        } else {
            WarriorModel.findOne({'name': heroName}, function (err, w) {
                if (err) return console.error(err);

                PaladinModel.findOne({'name': heroName}, function (err, p) {
                    if (err) return console.error(err);
                    if (w) {
                        new movement.move(w, m);
                        res.status = 200;
                        res.send("current Coord: " + w.x + " " + w.y);
                    } else if (p) {
                        new movement.move(p, m);
                        res.status = 200;
                        res.send("current Coord: " + p.x + " " + p.y);
                    } else {
                        m.remove(function (err, m) {
                            if (err) return console.error(err);
                        });
                        err = new Error("Hero doesn't exist");
                        err.status = 400;
                        next(err);
                    }
                });
            });
        }
    });
});

module.exports = actionRouter;