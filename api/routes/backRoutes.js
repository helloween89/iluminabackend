'use strict';
module.exports = function (app) {
    let user = require('../controllers/backControllers'),
    path = require("path"),
    multer = require('multer');

    let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadedimages/')
    },
    filename: function (req, file, cb) {
        cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({ storage: storage });

    // todoList Routes
    app.route('/user')
        .post(upload.single('img'), user.create_user);

    // todoList Routes
    app.route('/client')
        .post(user.loginRequired, user.create_client);

/*
    app.route('/clientupdate/:userId')
        .post(user.loginRequired, upload.single('img'), user.update_regpinfouser);
        */

    app.route('/auth/sign_in')
        .post(user.sign_in);

    app.route('/userupdate/:userId')
        .post(user.loginRequired,user.update_user);
/*
    app.route('/userdel/')
        .post(user.loginRequired, user.delete_user);
        */

    /*
    app.route('/testimg')
        .post(upload.single('fbimg'),user.sendimgcomplete);
        */
        
};