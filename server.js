/**
 * Created by yaroslav on 02.05.15.
 */
var express = require('express');
var app = express();
var bodyPars = require('body-parser');
var router = require('./routes/main.js')(app);

app.listen(3030, function () {
    console.log('server on port 3030');
});