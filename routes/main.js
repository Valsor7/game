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

        soldier = new warrior(warrName, 0, 0, 100, 'Human', 50, 30, 10);
        global.soldier = soldier;

        res.status(200).send("created warrior " + soldier.name);
        console.dir(soldier);
    });

    app.get('/paladin/:name', function (req, res, next) {
        var palName = req.params.name;

        pal = new paladin(palName, 400, 300, 200,"Elf",20,2,10,"White","God's scroll");
        global.paladin = pal;

        res.status(200).send("created paladin " + pal.name);
        console.dir(pal);
    });

    app.get('/warrior/move/:x/:y', function (req, res, next) {
        if (soldier === null){
            var err = new Error("You must create hero");
            next(err);
        }
        var x = req.params.x;
        var y = req.params.y;
        new movement(x,y,soldier);
         res.status(200).send("Coord:" + req.params.x + " " + req.params.y);
    });

    app.get('/paladin/move/:x/:y', function (req, res, next) {
        if (pal === null){
            var err = new Error("You must create hero");
            next(err);
        }
        var x = req.params.x;
        var y = req.params.y;
        new movement(x,y,pal);
        res.status(200).send("Coord:" + req.params.x + " " + req.params.y);
    });

    app.use('/', errHandler);

    function errHandler(err, req, res, next) {
        var status = 403;
        res.status(status).send(err.message);
    };

};

module.exports = main;