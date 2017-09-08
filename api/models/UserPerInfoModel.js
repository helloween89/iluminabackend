'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserInfo = new Schema({
    userid: {
        type: String,
        required: 'Please enter the username id'
    },
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
    img: {
        type: String,
        required: "Please Upload a picture"
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

module.exports = mongoose.model('Userinfo', UserInfo);