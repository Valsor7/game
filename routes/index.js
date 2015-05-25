/**
 * Created by yaroslav on 02.05.15.
 */
var actionRouter = require('./action.js');
var createRouter = require('./create.js');

function main(app) {

    app.use('/create', createRouter);

    app.use('/action', actionRouter);

    app.use('/', errHandler);

    function errHandler(err, req, res, next) {

        err.status = err.status || 500;
        res.status(err.status).send(err.message);
    };

};

module.exports = main;