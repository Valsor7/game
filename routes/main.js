/**
 * Created by yaroslav on 02.05.15.
 */
var warrior = require('../modules/warrior.js');
var paladin = require('../modules/paladin.js');
var movement = require('../modules/movement.js');
var fight = require('../modules/fight.js');
var heroes = [];
var err;
function main(app) {

    app.post('/create/warrior/:name', function (req, res, next ) {
        var warrName = req.params.name;

        if (heroExist(warrName)) {
            err = new Error("Hero with this name already exist");
            err.status = 400; // CHANGE Status!
            next(err);
        } else {
            heroes.push(new warrior(warrName, 10, 20, 100, 'Damage dealer', 50, 30, 30, 5));
            global.heroes = heroes;
            res.status(200).send("created warrior " + warrName);
        }
    });

    app.post('/create/paladin/:name', function (req, res, next) {
        var palName = req.params.name;

        if (heroExist(palName)) {
            err = new Error("Hero with this name already exist");
            err.status = 400; // CHANGE Status!
            next(err);
        } else {
            heroes.push(new paladin(palName, 400, 300, 200, "Tank", 80, 20, 40, 10, "White", "God's scroll"));
            global.heroes = heroes;

            res.status(200).send("created paladin " + palName);
        }
    });

    app.use('/action/:name', function exist(req, res, next) {

            if(heroes.length === 0){
                err = new Error("Create at least one hero");
                err.status = 400;
                next(err);
            } else {
                var name = req.params.name;
                if (!(heroExist(name))) {
                    console.log("You see it only if hero with this name doesn't exist");

                    err = new Error("Hero with this name doesn't exist");
                    err.status = 404; // CHANGE Status!
                    next(err);
                } else next();
            }

    });

    app.get('/action/:name/fight', function (req, res, next) {
        var heroName = req.params.name;

        heroes.forEach(function (elem, index, arr) {
            if (heroName === elem.name) {
                new fight(heroName);
                res.status = 200;
                res.send(heroName + " fight");
            };
        });
    });


    app.get('/action/:name/move/:x/:y', function (req, res, next) {
        var heroName = req.params.name;
        var x = req.params.x;
        var y = req.params.y;
        var respText = "Coord: " + req.params.x + " " + req.params.y;
        console.log(heroName);

        heroes.forEach(function (elem, index, arr) {
            if (heroName === elem.name) {
                new movement(elem, x, y);
                res.status = 200;
                res.send(respText);
                return;
            };
        });
    });

    app.use('/', errHandler);

    function errHandler(err, req, res, next) {

        err.status = err.status || 500;
        res.status(err.status).send(err.message);
    };

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

};

module.exports = main;