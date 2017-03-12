var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan      = require('morgan');
var passport	= require('passport');
var company = require('./routes/companies'); //routes are defined here
var news = require('./routes/news'); //routes are defined here
var pitches = require('./routes/pitches'); //routes are defined here
var validations = require('./routes/validations'); //routes are defined here
var forms = require('./routes/forms'); //routes are defined here
var index = require('./routes/index'); //routes are defined here
var app = express(); //Create the Express app
var config      = require('./config/database');
var authentication=require('./routes/users');
var messages=require('./routes/messages');
var publicRoutes=require('./routes/publicRoutes');
var masterdata=require('./routes/masterdata');
var fileUpload = require('express-fileupload');


app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(morgan('dev'));
app.use(passport.initialize());

//this for localhost
app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origin",'http://localhost:63342');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);

    next();

});

app.use('/',index);
app.use('/public', express.static(__dirname + '/public'));
mongoose.connect(config.database);
// CONNECTION EVENTS
// When successfully connected



require('./config/passport')(passport);

// bundle our routes
// create a new user account (POST http://localhost:8080/api/signup)

app.use('/api', authentication);
app.use('/api', company); //This is our route middleware
app.use('/api', pitches); //This is our route middleware
app.use('/api', masterdata); //This is our route middleware
app.use('/api', messages); //This is our route middleware
app.use('/api', validations); //This is our route middleware
app.use('/api', publicRoutes); //This is our route middleware
app.use('/api', forms); //This is our route middleware


module.exports = app;