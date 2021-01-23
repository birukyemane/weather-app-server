const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var temperatureSchema = new Schema({
    value:  {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

var observationSchema = new Schema({
    point: {
        type: String,
        required: true
    },
    temperatures:{
        type:[temperatureSchema],
        required: true
    }
});

var Observations = mongoose.model('Observations', observationSchema);

module.exports = Observations;