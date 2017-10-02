'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

let User = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Please enter an username'
    },
    password: {
        type: String,
        required: 'Please enter the password'
    },
    img: {
        type: String,
        required: "Please Upload a picture"
    },
    typeuser: {
        type: [{
            type: String,
            enum: ['a1', 'a2', 'admin'],
            default: ['a1']
        }],
    },
    date: {
        type: Date,
        default: Date.now
    },
}, { emitIndexErrors: true });

User.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

var handleDuplicate = function(error, res, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
   //console.log(error.name);
   let status = {"message":"User Already exist"};
    next(status);
  } else {
    next();
  }
};

User.post('save', handleDuplicate);
module.exports = mongoose.model('Users', User);