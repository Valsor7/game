var express = require('express');
var mongoose = require('mongoose');
var actionRouter = express.Router();
var movement = require('../modules/movement.js');
var fight = require('../modules/fight.js');
var HeroModel = mongoose.model('hero');

actionRouter.get('/:name/fight', function (req, res, next) {
    var heroName = req.params.name;
    HeroModel.findOne({'name': heroName}, function (err, h) {
        if (err) return next(err);
        if (h) {
            fight(h, HeroModel);

            res.status(200).send(h);
        } else {
            err = new Error("Hero doesn't exist");
            err.status = 400;
            next(err);
        }
    });
});

actionRouter.get('/:name/move/:x/:y', function (req, res, next) {
    var heroName = req.params.name;
    console.log(heroName);
    var x = req.params.x;
    var y = req.params.y;
    var HeroModel = mongoose.model('hero');
    HeroModel.findOne({name: heroName}, function (err, h) {
        if (err) return console.error(err);
        console.log(h);
            if (h) {
                if(h.way) {
                    res.status = 200;
                    res.send("use URL: action/heroName/move");
                } else {
                    new movement.moveFirst(h, x, y);
                    res.status = 200;
                    res.send(h);
                }
            } else {
                err = new Error("Hero doesn't exist");
                err.status = 400;
                next(err)
            }
    });
});

actionRouter.get('/:name/move', function (req, res, next) {
    var heroName = req.params.name;

    HeroModel.findOne({name: heroName}, function (err, h) {
        if (err) return console.error(err);
        if (!h.way) {
            res.status = 200;
            res.send("use URL: /heroName/move/x/y");
        } else {
            if (h) {
                new movement.move(h);
                res.status = 200;
                res.send(h);
            } else {
                err = new Error("Hero doesn't exist");
                err.status = 400;
                next(err);
            }
        }
    });
});

module.exports = actionRouter;