'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let User = new Schema({
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

module.exports = mongoose.model('Users', User);