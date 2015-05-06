/**
 * Created by yaroslav on 02.05.15.
 */
var warrior = require('../modules/warrior.js');
var paladin = require('../modules/paladin.js');
var movement = require('../modules/movement.js');
var soldier = null;
var pal = null;
function main(app) {

    app.get('/warrior/:name', function (req, res, next) {
        var warrName = req.params.name;

        soldier = new warrior(warrName, 10, 20, 100, 'Damage dealer', 50, 30, 30, 5);
        global.soldier = soldier;

        res.status(200).send("created warrior " + soldier.name);
        console.dir(soldier);
    });

    app.get('/paladin/:name', function (req, res, next) {
        var palName = req.params.name;

        pal = new paladin(palName, 400, 300, 200,"Tank",20,2,50, 10,"White","God's scroll");
        global.paladin = pal;

        res.status(200).send("created paladin " + pal.name);
        console.dir(pal);
    });

    app.get('/move/:name/:x/:y', function (req, res, next) {
        if (!(soldier && pal)){
            var err = new Error("You must create heroes first");
            err.status = 400;
            next(err);
        } else {
            var hero = req.params.name;
            var x = req.params.x;
            var y = req.params.y;
            console.log(hero);
            if (hero === soldier.name) {
                new movement(x, y, soldier);
            } else {
                if (hero === pal.name) {
                    new movement(x, y, pal);
                } else {
                    err = new Error("Hero with this name doesn't exist");
                    err.status = 404;
                    next(err);
                }
            }
            res.status(200).send("Coord:" + req.params.x + " " + req.params.y);
        }
    });

    app.use('/', errHandler);

    function errHandler(err, req, res, next) {

        res.status(err.status).send(err.message);
    };

};

module.exports = main;