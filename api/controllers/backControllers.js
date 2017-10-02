'use strict';

let mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    multer = require('multer'),
    path = require("path"),
    Client = mongoose.model('ClientModel');


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

    //let userupdate = new User(req.body);
    let encryptpass = bcrypt.hashSync(req.body.password, 10);
    let tuser = req.body.typeuser;
    let objupdate = {
        password: encryptpass,
        typeuser: tuser
    }

    User.findOneAndUpdate({ username: req.params.userId }, { $set: objupdate }, { new: true }, function (err, user) {

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

/*
exports.reg_pinfouser = function (req, res) {
    User.find({ username: req.params.userId }, function (err, task) {
        if (err) {
            res.send(err);
        } else {

            let info_user = new Userinfo(req.body);
            info_user.img = req.file.filename;
            //console.log(info_user.img);

            info_user.save(function (err, task) {
                if (err)
                    res.send(err);
                res.json(task);
            });

        }
    }).select('-__v');
};
*/

/*
exports.update_regpinfouser = function (req, res) {
    User.find({ username: req.params.userId }, function (err, task) {
        if (err) {
            res.send(err);
        } else {

            let info_user = new Userinfo(req.body);
            let img;
            //console.log(info_user.img);
            let objupdate = {};

            if (req.file == undefined) {
                objupdate.img = "";
            } else {
                objupdate.img = req.file.filename;
            }

            if (req.body.name != undefined) objupdate.name = req.body.name;
            if (req.body.status != undefined) objupdate.status = req.body.status;
            if (req.body.sex != undefined) objupdate.sex = req.body.sex;
            if (req.body.age != undefined) objupdate.age = req.body.age;
            if (!req.body.profession != undefined) objupdate.profession = req.body.profession;

            //console.log(objupdate);

            Userinfo.findOneAndUpdate({ userid: req.params.userId }, { $set: objupdate }, { new: true }, function (err, user) {

                if (err) {

                    res.send(err);

                } else {
                    return res.json(user);
                }

            });

        }
    }).select('-__v');
};
*/


/*
exports.delete_user = function (req, res) {

        User.findOneAndRemove({ username: req.body.username }, function (err, user) {
            if (err) {
                return res.send(err);
            } else {
                console.log(req.body.username);
                Userinfo.findOneAndRemove({ userid: req.body.username }, function (err, userinfo) {

                    if (err) {
                        return res.send(err);
                    } else {
                        return res.json({ success: "User deleted correctly" });
                    }

                });
            }
        });
        //Userinfo.remove({userId: req.params.userId});

        //res.send({success: "User deleted sucessfully"});

};
*/

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
