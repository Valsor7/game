/**
 * Created by yaroslav on 02.05.15.
 */
var actionRouter = require('./action.js');
var heroRouter = require('./hero.js');
function main(app) {

    app.get('/', function (req, res, next) {
        res.status(200).send('js Game');
    });

    app.use('/hero', heroRouter);

    app.use('/action', actionRouter);

    app.use('/', errHandler);

    function errHandler(err, req, res, next) {

        err.status = err.status || 500;
        console.log(err);
        res.status(err.status).send(err.message);
    };
};

module.exports = main;