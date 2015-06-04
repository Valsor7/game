/**
 * Created by yaroslav on 02.05.15.
 */
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var url = 'mongodb://localhost/game';

mongoose.connect(url);
var db = mongoose.connection;

db.once('open', function () {
    require('./routes/index.js')(app);

    app.listen(3030, function () {
        console.log('server on port 3030');
    });
});

db.on('error', console.error);


