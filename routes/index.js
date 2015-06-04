/**
 * Created by yaroslav on 02.05.15.
 */
var bodyParser = require('body-parser');
var actionRouter = require('./action.js');
var createRouter = require('./create.js');

function main(app) {

    app.use(bodyParser.json());
    app.use('/create', createRouter);

    app.use('/action', actionRouter);

    app.use('/', errHandler);

    function errHandler(err, req, res, next) {

        err.status = err.status || 500;
        console.log(err);
        res.status(err.status).send(err.message);
    };
};

module.exports = main;