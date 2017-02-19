/**
 * Created by subtainishfaq on 10/18/16.
 */
var Validation = require('../models/validation');
var express = require('express');
var jwt    = require('jwt-simple');
var config      = require('../config/database');
var passport	= require('passport');
var User = require('../models/user');

var router = express.Router();




router.route('/validation')
    .get(function(req, res) {

        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            User.findOne({
                name: decoded.name
            }, function(err, user) {
                if (err) throw err;

                if (!user) {
                    return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
                } else {
                    Validation.findOne(function(err, user)
                    {
                        if (err) throw err;
                        else
                            res.json(user);



                    })

                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'No token provided.'});
        }

})

.post(function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                Validation.count({}, function(err, count)
                {
                    if(count>0);
                    else {
                        var validation = new Validation(req.body);

                        validation.save(function(err) {
                            if (err) {
                                return res.send(err);
                            }

                            res.send({ message: 'Validation Added' });
                        });
                    }
                });


            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

router.route('/validation').put(function(req,res){


    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                Validation.findOne(function(err, validation) {
                    if (err) {
                        return res.send(err);
                    }

                    for (prop in req.body) {
                        validation[prop] = req.body[prop];
                    }

                    // save the validation
                    validation.save(function(err) {
                        if (err) {
                            return res.send(err);
                        }

                        res.json({ message: 'Validation updated!' });
                    });
                });


            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }


});




getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;
