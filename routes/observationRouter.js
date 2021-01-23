const express = require('express');
const bodyParser = require('body-parser');
const Observations = require('../models/observations');

const observationRouter = express.Router();

observationRouter.use(bodyParser.json());

observationRouter.route('/')
.get((req,res,next) => {
    Observations.find({})
    .then((observations) => {
        res.statusCode = 200;
        res.set({'Content-Type': 'application/json'});
        res.json(observations);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Observations.create(req.body)
    .then((observation) => {
        console.log('Observation Created ', observation);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(observation);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.set({'Content-Type': 'application/json'});
    Observations.findOne({point: req.body.point}, function (err, doc) {
        if (err) next(err);
        if(doc){
            doc.temperatures.push({value:req.body.value})
            doc.save()
                .then((observation) => {
                    console.log('Observation Updated ', observation);
                    res.statusCode = 200;
                    res.json(observation);
                })
                .catch((err) => next(err));
        } else {
            res.statusCode = 202;
            res.json({});
        }
    })
})
.delete((req, res, next) => {
    Observations.deleteMany({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

module.exports = observationRouter;