'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Client = new Schema({
    name: {
        type: String,
        unique: true,
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

var handleDuplicate = function(error, res, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
   //console.log(error.name);
   let status = {"message":"Client Already exist"};
    next(status);
  } else {
    next();
  }
};

Client.post('save', handleDuplicate);
module.exports = mongoose.model('ClientModel', Client);