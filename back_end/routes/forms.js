/**
 * Created by subtainishfaq on 10/18/16.
 */
var Form = require('../models/form');
var express = require('express');
var jwt    = require('jwt-simple');
var config      = require('../config/database');
var passport	= require('passport');
var User = require('../models/user');

var router = express.Router();




router.route('/form')
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
                    Form.findOne(function(err, user)
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
                Form.count({}, function(err, count)
                {
                    if(count>0);
                    else {
                        var form = new Form(req.body);

                        form.save(function(err,validator) {
                            if (err) {
                                return res.send(err);
                            }

                            res.send(validator);
                        });
                    }
                });


            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

router.route('/form').put(function(req,res){


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
                Form.findOne(function(err, form) {
                    if (err) {
                        return res.send(err);
                    }

                    for (prop in req.body) {
                        form[prop] = req.body[prop];
                    }

                    // save the form
                    form.save(function(err,validator) {
                        if (err) {
                            return res.send(err);
                        }

                        res.json(validator);
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
