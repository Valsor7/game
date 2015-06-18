/**
 * Created by yaroslav on 13.06.15.
 */
var express = require('express');
var heroRouter = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
heroRouter.use(bodyParser.json());
heroRouter.route('/')
    .get(function (req, res, next) {
        console.log("GET heroes");
        var model = mongoose.model('hero');
        model.find(function (err, hs) {
            if (err) return next(err);
            if(hs) {
                res.status(200).send(hs);
                console.log(h);
            } else{
                next(err);
            }

            console.log('!--------------------------------!');
        });
    })

    .post(function (req, res, next) {
        console.log("POST heroes");
        var Model = mongoose.model('hero');
        var hero = new Model(req.body);
        console.log(req.body);
        hero.save(function (err, h) {
            if (err) return next(err);
            console.log(h);
            console.log('!--------------------------------!');

            res.status(200).send(h);
        });
    });

heroRouter.route('/:id')
    .get(function (req, res, next) {
        console.log("GET hero");
        var id = req.params.id;
        var model = mongoose.model('hero');
        model.findById(id, function (err, h) {
            if (err) return next(err);
            if(h) {
                res.status(200).send(h);
                console.log(h);
            } else{
                next(err);
            }

            console.log('!--------------------------------!');
        });
    })

    .put(function (req, res, next) {
        console.log("PUT hero");
        var id = req.params.id;
        var model = mongoose.model('hero');
        console.log(req.body);
        model.findByIdAndUpdate(id, req.body.name, function (err, h) {
            if (err) return next(err);
            console.log(h);
            console.log('!--------------------------------!');
            res.status(200).send("updated");
       });
    })

    .delete(function (req, res, next) {
        console.log("DELETE hero");
        var id = req.params.id;
        var model = mongoose.model('hero');
        model.remove({_id: id}, function (err, h) {
            if (err) return next(err);
            console.log(h);
            console.log('!--------------------------------!');
            res.status(200).send(h);
        });
    });

module.exports = heroRouter;