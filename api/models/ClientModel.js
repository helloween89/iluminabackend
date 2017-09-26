'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Client = new Schema({
    name: {
        type: String,
        required: 'Please enter your name'
    },
    status: {
        type: [{
            type: String,
            enum: ['single', 'married', 'divorced']
        }],
        default: ['single']
    },
    sex: {
        type: [{
            type: String,
            enum: ['male', 'female']
        }],
        default: ['male']
    },
    age: {
        type: String,
        required: 'Please enter your age'
    },
    profession: {
        type: String,
        required: 'Please enter your profession'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('ClientModel', Client);