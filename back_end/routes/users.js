var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Company = require('../models/company');
var Pitches = require('../models/pitch');
var Validation = require('../models/validation');
var jwt    = require('jwt-simple');
var config      = require('../config/database');
var passport	= require('passport');
var nodemailer = require('nodemailer');




router.route('/users')
    .get(function(req, res) {


        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            User.findOne({
                name: decoded.name
            }, function(err, user) {
                if (err) throw err;

                if (!user)
                {
                    return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
                } else
                {


                    console.log("in get");
                    User.paginate({}, { page : req.param('page'), limit: 10 , sort : {created_time :'desc'} }, function(error, pageCount, paginatedResults) {
                        if (error) {
                            console.error(error);
                            res.send(error);
                        } else {

                            res.json(pageCount);
                            console.log(pageCount);
                        }
                        //  res.json("nothing");
                    });

                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'No token provided.'});
        }



    });


router.route('/userstree')
    .get(function(req, res) {


        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            User.findOne({
                name: decoded.name
            }, function(err, user) {
                if (err) throw err;

                if (!user)
                {
                    return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
                } else
                {



                 user.getChildrenTree(function(err, users) {

                  var   parsed = JSON.parse(JSON.stringify(users), function(k, v) {
                         if (k === "children")
                             this.treeNode = v;

                         else
                             return v;
                     });

                        res.json(parsed);
                      //  console.log(users);
                 });

                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'No token provided.'});
        }

    });

router.route('/userschildren')
    .get(function(req, res) {


        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            User.findOne({
                name: decoded.name
            }, function(err, user) {
                if (err) throw err;

                if (!user)
                {
                    return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
                } else
                {



                    user.getChildren(true,function(err, users) {



                        res.json(users);
                      //  console.log(users);
                 });

                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'No token provided.'});
        }

    });



router.route('/usersbylevel')
    .get(function(req, res) {


        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            User.findOne({
                name: decoded.name
            }, function(err, user) {
                if (err) throw err;

                if (!user)
                {
                    return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
                } else
                {


                    User.find({/*nodeLevel:{$gt :user.nodeLevel }*/ },function (err,users) {
                        console.log(users);
                        res.json(users);
                    });

                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'No token provided.'});
        }

    });


router.route('/usersteamlead')
    .get(function(req, res) {


        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            User.findOne({
                name: decoded.name
            }, function(err, user) {
                if (err) throw err;

                if (!user)
                {
                    return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
                } else
                {


                    User.find({nodeLevel:{$lte :2 } },function (err,users) {
                        console.log(users);
                        res.json(users);
                    });

                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'No token provided.'});
        }

    });

router.route('/usersunassigned')
    .get(function(req, res) {


        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            User.findOne({
                name: decoded.name
            }, function(err, user) {
                if (err) throw err;

                if (!user)
                {
                    return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
                } else
                {


                    User.find({ isAssingned:false,_id: { $ne: user._id } },function (err,users) {
                        res.json(users);
                    });

                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'No token provided.'});
        }

    });

router.route('/userssetup/:userchild')
    .get(function(req, res) {


        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token, config.secret);
            User.findOne({
                name: decoded.name
            }, function(err, user) {
                if (err) throw err;

                if (!user)
                {
                    return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
                } else
                {



                    User.findOne({_id:req.params.userchild},function (err,us)
                    {
                         if (err)  return res.status(505).send({success: false, msg: 'Authentication failed. User Problem.'});

                         if(!us) return res.status(505).send({success: false, msg: 'Authentication failed. User Problem.'});

                         else  if(!us.isAssingned)
                          {
                              us.parent=user._id;
                              us.isAssingned=true;
                              user.save(function (err) {
                                  us.save(function (err) {

                                      user.getChildrenTree(function (err,use) {

                                          res.json(use);

                                      });


                                  });



                              });
                          }

                          else
                              res.json({success:false , msg : 'Already Assigned'})
                    });




                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'No token provided.'});
        }

    });



router.post('/signup', function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password

    });


    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});




router.post('/emailsending/:idcompany/:idcontactperson', function(req, res) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 's.subtain@gmail.com', // Your email id
            pass: 'Bese-18a-+717541202' // Your password
        }
    });

   // var text = 'Hello world from \n\n'

    var mailOptions = {
        from: 's.subtain@gmail.com', // sender address
        to:  req.body.email, // list of receivers
        subject: 'Testing Email', // Subject line
       // text: text //, // plaintext body
        html: req.body.content // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{

            Company .update(
                {_id: req.params.idcompany, 'contactPersons._id': req.params.idcontact},
                {'$set': {
                    'contactPersons.$.isEmailed': true,

                }, '$inc' : { "contactPersons.$.emailCount" : 1 }

                },
                function(err, numAffected)
                {

                    if (err) {
                        return res.send(err);
                    }

                    res.json({status: true});
                }
            );

        }
    });
});


router.post('/emailsending/:idpitch', function(req, res) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 's.subtain@gmail.com', // Your email id
            pass: 'Bese-18a-+717541202' // Your password
        }
    });

   // var text = 'Hello world from \n\n'

    var mailOptions = {
        from: 's.subtain@gmail.com', // sender address
        to:  req.body.email, // list of receivers
        subject: 'Testing Email', // Subject line
       // text: text //, // plaintext body
        html: req.body.content // You can choose to send an HTML body instead
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{

            Pitches.update({ _id: req.params.id }, {
                '$set': {
                    'inner.isEmailed': true

                }, '$inc' : { "inner.emailCount" : 1 }


            },function (err,pot) {
                if (err) {
                    return res.send(err);
                }

                res.json({status: true});

            });

        }
    });
});





router.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
      console.log("hello I found the user");

      if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      console.log("hello I found the user");
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON

            Validation.count({}, function(err, count)
            {
                if(count>0)
                {
                    Validation.findOne(function (err,val)
                    {
                        console.log(val);
                        console.log("inside Validation");
                        console.log(err);
                        res.json({success: true, token: 'JWT ' + token,settings:true , validation: val ,userId : user._id});

                    });
                }
                 else
                 res.json({success: true, token: 'JWT ' + token,settings:false,userId : user._id});

            });
          } else {
               res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
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
        res.json({success: true, msg: 'Welcome in the member area ' + user.name + ' role ' + decoded.userRole});
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

router.route('/users/:id').get(function(req, res) {
  User.findOne({ _id: req.params.id}, function(err, user) {
    if (err) {
      return res.send(err);
    }

    res.json(user);
  });
});


router.route('/users/:id').delete(function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
      if (err) throw err;

      if (!user)
      {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } else
      {

        User.remove({
          _id: req.params.id
        }, function(err, user) {
          if (err) {
            return res.send(err);
          }

          res.json({ message: 'Successfully deleted' });
        });


      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }



});
router.route('/users/:id').put(function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
      if (err) throw err;

      if (!user)
      {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } else
      {

          User.findOne({ _id: req.params.id }, function(err, company) {
              if (err) {
                  return res.send(err);
              }

              if (typeof(req.body.parentId) == "undefined")
              {
                  company.parent=user._id;
              }


                  for (prop in req.body) {
                  if(prop=="parentId")
                  company.parent= req.body[prop];
                  else
                  company[prop] = req.body[prop];
              }

              // save the company
              company.save(function(err) {
                  if (err) {
                      return res.send(err);
                  }

                  res.json({ message: 'user updated!' });
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
