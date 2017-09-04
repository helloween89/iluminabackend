'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserInfo = new Schema({
    username: {
        type: String,
        required: 'Please enter an username'
    },
    password: {
        type: String,
        required: 'Please enter the password'
    },
    typeuser: {
        type: [{
            type: String,
            enum: ['a1', 'a2', 'admin']
        }],
        default: ['a1']
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', UserInfo);