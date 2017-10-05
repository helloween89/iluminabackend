'use strict';

let mongoose = require('mongoose'),
User = mongoose.model('Users'),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
multer = require('multer'),
path = require("path"),
Client = mongoose.model('ClientModel');
    
let fs = require('fs');


    exports.create_user = function (req, res) {
        console.log("user: ", req.body);
        let new_user = new User(req.body);
        new_user.password = bcrypt.hashSync(req.body.password, 10);
        new_user.img = req.file.filename;
        console.log(new_user.img);

        new_user.save(function (err, user) {
            if (err) {
                console.log(err);
                return res.status(501).json(err);
            } 
            new_user.password = undefined;
            return res.status(201).json(user);
        });

    };

exports.update_user = function (req, res) {

    console.log("username", req.body.username);
    let encryptpass = bcrypt.hashSync(req.body.password, 10);
    let tuser = req.body.typeuser;
    let objupdate = {
        username: req.body.username,
        password: encryptpass,
        typeuser: tuser,
        img: req.file.filename
    }

    User.findOneAndUpdate({ username: req.body.username }, { $set: objupdate }, { new: true }, function (err, user) {

        if (err) {

            return res.status(501).json(err);

        } else {

            return res.status(201).json(user);

        }

    });

};

exports.create_client = function (req, res) {
        //console.log("user: ", req.body);
        let new_client = new Client(req.body);
        new_client.save(function (err, client) {
            if (err) {
                //console.log({'err': err});
                return res.status(501).json(err);
            } 
            return res.status(201).json(client);
        });

    };

exports.getAllUsers = function (req, res) {
    //console.log("user: ", req.body);
    //let users = new User(req.body);
    User.find(function (err, client) {
        if (err) {
            //console.log({'err': err});
            return res.status(501).json(err);
        }
        return res.status(201).json(client);
    });

};

exports.getUserById = function (req, res) {
    console.log("user: ", req.body.username);
    //let users = new User(req.body);
    User.find({username: new RegExp(req.body.username, "i")}, function (err, client) {
        if (err) {
            //console.log({'err': err});
            return res.status(501).json(err);
        }
        return res.status(201).json(client);
    });

};


exports.delete_user = function (req, res) {

    User.findOneAndRemove({ username: req.body.username }, function (err, user) {
     if (err) {
        return res.status(501).json(err);
    }

    fs.unlink('uploadedimages/'+req.body.img,  (err) => {
        return res.status(201).json(user);
        if(err){
         console.log("failed to delete local image:"+err);
     }else{
        console.log('successfully deleted local image');
    }    
});

});

};

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
