var express = require('express');
var actionRouter = express.Router();
var movement = require('../modules/movement.js');
var fight = require('../modules/fight.js');

actionRouter.param('name', function exist(req, res, next, name) {

    if(!global.heroes){
        err = new Error("Create at least one hero");
        err.status = 400;
        next(err);
    } else {
        if (!(heroExist(name))) {
            console.log("You see it only if hero with this name doesn't exist");

            err = new Error("Hero with this name doesn't exist");
            err.status = 400; // CHANGE Status!
            next(err);
        } else {
            req.name = name;
            next();
        }
    }

});

actionRouter.get('/:name/fight', function (req, res, next) {
    var heroName = req.name;

    global.heroes.forEach(function (elem, index, arr) {
        if (heroName === elem.name) {
            new fight(heroName);
            res.status = 200;
            res.send(heroName + " fight");
        };
    });
});

actionRouter.get('/:name/move/:x/:y', function (req, res, next) {
    if(global.way && global.turn){
        err = new Error("use URL: /heroName/move");
        err.status = 403; // CHANGE Status!
        next(err);
    } else {

        var heroName = req.name;
        var x = req.params.x;
        var y = req.params.y;

        console.log(heroName);

        global.heroes.forEach(function (elem, index, arr) {
            if (heroName === elem.name) {
                new movement.moveFirst(elem, x, y);
                res.status = 200;
                res.send("Coord: " + elem.x + " " + elem.y);
                return;
            }
            ;
        });
    }
});

actionRouter.get('/:name/move', function (req, res, next) {
    if(!(global.way && global.turn)){
        err = new Error("use URL: /heroName/move/x/y ");
        err.status = 403;
        next(err);
    } else {
        var heroName = req.name;

        console.log(heroName);

        global.heroes.forEach(function (elem, index, arr) {
            if (heroName === elem.name) {
                new movement.move(elem);
                res.status = 200;
                res.send("Coord: " + elem.x + " " + elem.y);
                return;
            }
            ;
        });
    }
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

module.exports = actionRouter;