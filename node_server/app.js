
/*Modules required in this application*/
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var jsonfile = require('jsonfile')
var bodyParser = require('body-parser');
var fs = require('fs-extra')
var employeeModule = require('./routes/employeeController.js');
var methodOverride = require('method-override');
/*Configuration*/
config = require('./config.json'); 


app.use(express.static('public'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


/*mongodb config*/
mongoose.set('debug', true);

mongoose.connect(config.dbUrl);

mongoose.connection.on('error', console.error.bind(console, 'connection error:'  ));

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to::>  ' + config.dbUrl );
});

/*Cross-Origin-Request */
app.use(function (req, res, next) {
    var typeOf = false;
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        typeOf = true;
    }
    if (req.headers.origin) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-Allow-Headers']);
        typeOf = true;
    }
    if (req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        typeOf = true;
    }
    if (req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        typeOf = true;
    }

    // intercept OPTIONS method
    if (typeOf && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});



/***************************Routes*******************************/
app.get('/', function(req,res){
	 res.sendfile('./views/server.html');
});

app.get('/employeelist', employeeModule.employeeListMethod);

app.post('/editemployee', employeeModule.employeeEditMethod);

app.post('/addemployee', employeeModule.employeeAddMethod);

app.delete('/deleteemployee/:_id',employeeModule.employeeDeleteMethod);

app.listen(config.port);
console.log('server started at:  '+config.port);



