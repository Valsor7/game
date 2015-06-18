/**
 * Created by yaroslav on 02.05.15.
 */
var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var url = 'mongodb://localhost/game';

mongoose.connect(url);
var db = mongoose.connection;

db.once('open', function () {
    app.use(bodyParser.json());
    app.use(logger('dev'));
    app.use(express.static(__dirname + '/public'));

    require('./routes/')(app);

    app.listen(3030, function () {
        console.log('server on port 3030');
    });
});

db.on('error', function (err) {
    console.error(err);
});


