'use strict';
module.exports = function (app) {
    let user = require('../controllers/backControllers');

    // todoList Routes
    app.route('/user')
        .post(user.create_user);

    // todoList Routes
    app.route('/userinfo/:userId')
        .post(user.loginRequired, user.reg_pinfouser);

    app.route('/auth/sign_in')
        .post(user.sign_in);

    
    app.route('/testimg')
        .post(user.sendimgcomplete);
        

};