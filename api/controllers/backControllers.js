'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    bcrypt = require('bcrypt'),
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
            new_user.hash_password = undefined;
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
            info_user.save(function (err, task) {
                if (err)
                    res.send(err);
                res.json(task);
            });
        }
    }).select('-__v');
};

exports.sign_in = function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
            
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            } else {
                return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
            }
        }
    });
};

exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};
