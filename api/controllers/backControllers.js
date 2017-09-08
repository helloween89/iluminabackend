'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    multer = require('multer'),
    path = require("path"),
    Userinfo = mongoose.model('Userinfo');


exports.create_user = function (req, res) {
    let new_user = new User(req.body);
    new_user.password = bcrypt.hashSync(req.body.password, 10);
    new_user.save(function (err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            new_user.password = undefined;
            return res.json(user);
        }
    });
};

exports.update_user = function(req, res){

    //let userupdate = new User(req.body);
    let encryptpass = bcrypt.hashSync(req.body.password, 10);
    let tuser = req.body.typeuser;
    let objupdate = {
        password: encryptpass,
        typeuser: tuser
    }

    User.findOneAndUpdate({ username: req.params.userId},{$set:objupdate}, {new: true}, function(err, user){

        if (err) {

            res.send(err);
        
        } else {
            return res.json(user);
        }

    });
    
};

exports.reg_pinfouser = function (req, res) {
    User.find({ username: req.params.userId}, function (err, task) {
        if (err){
            res.send(err);
        }else{

            let info_user = new Userinfo(req.body);
            info_user.img = req.file.filename;
            console.log(info_user.img);
            
            info_user.save(function (err, task) {
                if (err)
                    res.send(err);
                res.json(task);
            });
            
        }
    }).select('-__v');
};

/*
exports.sendimgcomplete = function(req, res){

    console.log("file" + req.file);
    res.send('Successfully uploaded!');

}
*/

exports.sign_in = function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        }
        return res.json({ token: jwt.sign({ username: user.username, typeuser: user.typeuser, _id: user._id }, 'RESTFULAPIs') });
    });
};

exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};
