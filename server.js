let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('./api/models/UserModels'),
    UserP = require('./api/models/UserPerInfoModel'), //created model loading here
    bodyParser = require('body-parser'),
    multer = require('multer'),
    path = require("path"),
    jsonwebtoken = require("jsonwebtoken");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Userdb');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadedimages/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

let upload = multer({ storage: storage })

app.post('/upload', upload.single('fbimg'), function (req, res) {
    console.log("file" + req.file);
    res.send('Successfully uploaded!');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

let routes = require('./api/routes/backRoutes'); //importing route
routes(app); //register the route


app.listen(port);

console.log('todo list RESTful API server started on: ' + port);