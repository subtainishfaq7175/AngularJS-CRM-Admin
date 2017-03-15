/**
 * Created by subtainishfaq on 10/18/16.
 */
var Pitches = require('../models/pitch');
var express = require('express');
var fs = require('node-fs');
var busboy = require('connect-busboy');
var jwt    = require('jwt-simple');
var config      = require('../config/database');
var passport	= require('passport');
var User = require('../models/user');
var mongoose=require('mongoose');



var router = express.Router();
router.use(busboy());

router.route('/pitchsearch')
    .get(function(req, res) {


        Pitches.paginate({"pitchTitle":{ "$regex": "^"+req.param('query'), "$options": "i" }}, { page : req.param('page'), limit: 10 , sort : {created_time :'desc'} }, function(error, pageCount, paginatedResults) {
            if (error) {
                console.error(error);
                res.send(error);
            } else {

                res.json(pageCount);
            }
        });


})
;

//pitches Filter

/*router.route('/pitchesFilter')
    .get(function(req, res) {

      var  andingParams=[];
      var  sorting={};

        if(typeof req.param('categories')!== 'undefined' && req.param('categories')!== 'all')
            andingParams.push({"categories.title":{ "$regex": "^"+req.param('categories'), "$options": "i" }});

        if(typeof req.param('genre')!== 'undefined'&& req.param('genre')!== 'all')
            andingParams.push({"genre.title":{ "$regex": "^"+req.param('genre'), "$options": "i" }});

        if(typeof req.param('language')!== 'undefined'  && req.param('language')!== 'all')
        {
            andingParams.push({"languages.title":{ "$regex": "^"+req.param('language'), "$options": "i" }});
        }


        var  query;
        if(andingParams.length>0)
            query ={
                $and : andingParams

            };
        else
            query={};
        if(typeof req.param('order')!== 'undefined')
        {
            sorting["created_time"]=req.param('order');
        }
        if(typeof req.param('orderby')!== 'undefined')
        {
            sorting[req.param('order')]="desc";
            if(req.param('orderby')==="title")
                sorting[req.param('order')]="asc";
        }

        Pitches.paginate(query, { page : req.param('page'), limit: 10 , sort : sorting }, function(error, pageCount, paginatedResults) {
            if (error) {
                res.send(error);
            } else {

                res.json(pageCount);
            }
        });


});*/

router.route('/pitchesdraft')
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
                {/*
                    Pitches
                        .find()
                        .populate('assignedPeople')
                        .exec(function (err, story) {
                            if (err) return handleError(err);

                            var response=[];
                            for(var i=0;i<story.length;i++) {
                                if (typeof story[i].assignedPeople != 'undefined' && story[i].assignedPeople.length > 0)
                                    for(var j=0;j< story[i].assignedPeople.length;j++)
                                         if (user._id == story[i].assignedPeople[j]._id)
                                                response.push(story[i]);
                                        else if  (user.level >= story[i].assignedPeople[j].level)
                                         {
                                             response.push(story[i]);
                                         }
                                    console.log(story);
                            }
                            res.json(response);


                            // prints "The creator is Aaron"
                        });*/
                    Pitches.paginate({isPublished : false}, { page : req.param('page'), limit: 10 , sort : {created_time :'desc'} }, function(error, pageCount, paginatedResults) {
                        if (error) {
                            console.error(error);
                            res.send(error);
                        } else {
                         /*   if (typeof pageCount.docs != 'undefined' && pageCount.docs.length>0 )
                                for(var i=0;i<pageCount.docs.length;i++)
                                {
                                    if( typeof pageCount.docs[i].assignedPeople != 'undefined'&&  pageCount.docs[i].assignedPeople.length>0)
                                    {

                                    }
                                }
*/
                            res.json(pageCount);
                        }
                    },{columns: {}, populate: ['assignedPeople'], sortBy: {title: -1}});

                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'No token provided.'});
        }






})


router.route('/pitches')
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
                {/*
                    Pitches
                        .find()
                        .populate('assignedPeople')
                        .exec(function (err, story) {
                            if (err) return handleError(err);

                            var response=[];
                            for(var i=0;i<story.length;i++) {
                                if (typeof story[i].assignedPeople != 'undefined' && story[i].assignedPeople.length > 0)
                                    for(var j=0;j< story[i].assignedPeople.length;j++)
                                         if (user._id == story[i].assignedPeople[j]._id)
                                                response.push(story[i]);
                                        else if  (user.level >= story[i].assignedPeople[j].level)
                                         {
                                             response.push(story[i]);
                                         }
                                    console.log(story);
                            }
                            res.json(response);


                            // prints "The creator is Aaron"
                        });*/
                    Pitches.paginate({isPublished : true}, { page : req.param('page'), limit: 10 , sort : {created_time :'desc'} }, function(error, pageCount, paginatedResults) {
                        if (error) {
                            console.error(error);
                            res.send(error);
                        } else {
                         /*   if (typeof pageCount.docs != 'undefined' && pageCount.docs.length>0 )
                                for(var i=0;i<pageCount.docs.length;i++)
                                {
                                    if( typeof pageCount.docs[i].assignedPeople != 'undefined'&&  pageCount.docs[i].assignedPeople.length>0)
                                    {

                                    }
                                }
*/
                            res.json(pageCount);
                        }
                    },{columns: {}, populate: ['assignedPeople'], sortBy: {title: -1}});

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

            if (!user)
            {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else
                {

                   var pitch = new Pitches(req.body);
                   pitch.save(function(err)
                {
                    if (err) {
                        return res.send(err);
                    }

                    res.send({ message: 'Pitch Added' });
                });

                }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }



});


router.route('/pitches/:id').put(function(req,res){
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


                Pitches.findOne({ _id: req.params.id }, function(err, pitch) {
                    if (err) {
                        return res.send(err);
                    }

                    for (prop in req.body) {
                        pitch[prop] = req.body[prop];
                    }
            //    pitch["isPublished"]=req.body["isPublished"];



                    // save the pitch
                    pitch.save(function(err,pit) {

                        Pitches.update({ _id: req.params.id }, { $set: { inner: req.body.inner }},function (err,pot) {
                            if (err) {
                                return res.send(err);
                            }
                            res.json({ message: 'Pitch updated!', pitch: pot });

                        });

                    });
                });
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }






});


router.route('/pitches/:id').get(function(req, res) {
    Pitches.findOne({ _id: req.params.id}, function(err, pitch) {
        if (err) {
            return res.send(err);
        }

        res.json(pitch);
    });

});


router.route('/pitches/:id').delete(function(req, res) {
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

                Pitches.remove({
                    _id: req.params.id
                }, function(err, pitch) {
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

router.route('/pitchesupdate/')
    .get(function(req, res) {

        Pitches.find(function(err, games) {
            if (err) {
                return res.send(err);
            }

            res.json(games);
        }).limit(5);

    });

//pitches images upload
/*
router.route('/gamesimage/:id').put(function(req,res){
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


                var fstream;
                req.pipe(req.busboy);
                req.busboy.on('file', function (fieldname, file, filename) {





                    Pitches.findOne({ _id: req.params.id }, function(err, pitch) {
                        if (err) {
                            return res.send(err);
                        }
                        console.log(file);
                        pitch["image"] = file.buffer;


                        // save the pitch
                        pitch.save(function(err) {
                            if (err) {
                                return res.send(err);
                            }

                            res.json({ message: 'Pitch updated!' });
                        });
                    });

                });


            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }


});*/


//pitches priority setter
/*

router.route('/gameslike/:id').get(function(req,res){
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



                    Pitches.findOne({ _id: req.params.id }, function(err, pitch) {
                        if (err) {
                            return res.send(err);
                        }

                        if ( typeof pitch["likes"] === 'undefined' )
                            pitch["likes"]={count : 0 , _creator:[]};

                        if(pitch["likes"]._creator.indexOf(user._id)!== -1)
                        {  var i =pitch["likes"]._creator.indexOf(user._id);
                            pitch["likes"]._creator.pull(user._id );
                            pitch["likes"].count--;
                            pitch.save();
                            console.log(i);
                            return res.json({message: "duplicate"});

                        }


                        pitch["likes"]._creator.push(user._id);
                        pitch["likes"].count++;




                        // save the pitch
                        pitch.save(function(err) {
                            if (err) {
                                return res.send(err);
                            }

                            res.json({ message: 'Pitch updated!' });
                        });
                    });




            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }


});
*/

//decreasing prority
/*

router.route('/pitchesdislikes/:id').get(function(req,res){
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



                    Pitches.findOne({ _id: req.params.id }, function(err, pitch) {
                        if (err) {
                            return res.send(err);
                        }


                        if ( typeof pitch["dislikes"] === 'undefined' )
                            pitch["dislikes"]={count : 0 , _creator:[]};

                        if(pitch["dislikes"]._creator.indexOf(user._id)!== -1)
                        { var i =pitch["dislikes"]._creator.indexOf(user._id);
                            pitch["dislikes"]._creator.pull(user._id );
                            pitch["dislikes"].count--;
                            pitch.save();
                            return res.json({message: "duplicate"});

                        }


                        pitch["dislikes"]._creator.push(user._id);
                        pitch["dislikes"].count++;






                        // save the pitch
                        pitch.save(function(err) {
                            if (err) {
                                return res.send(err);
                            }

                            res.json({ message: 'Pitch updated!' });
                        });
                    });




            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }


});

*/

//notifying attributes for pitches

/*

router.route('/gamesfavourites/:id').get(function(req,res){
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



                    Pitches.findOne({ _id: req.params.id }, function(err, pitch) {
                        if (err) {
                            return res.send(err);
                        }


                        if ( typeof pitch["favourites"] === 'undefined' )
                            pitch["favourites"]={count : 0 , _creator:[]};

                        if(pitch["favourites"]._creator.indexOf(user._id)!== -1)
                        {   var  i=pitch["favourites"]._creator.indexOf(user._id);
                            pitch["favourites"]._creator.pull( user._id);
                            pitch["favourites"].count--;
                            pitch.save();
                            return res.json({message: "duplicate"});

                        }

                        pitch["favourites"]._creator.push(user._id);
                        pitch["favourites"].count++;
                        if ( typeof user["favourites_games"] === 'undefined' )
                            user.favourites_games=[];

                        user.favourites_games.push(pitch._id);
                        user.save();


                        // save the pitch
                        pitch.save(function(err) {
                            if (err) {
                                return res.send(err);
                            }

                            res.json({ message: 'Pitch updated!' });
                        });
                    });




            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }


});

router.route('/gamesfavourite')
    .get(function(req, res) {
        Pitches.find().sort('-favourites.count')
            .limit(5)
            .exec(function(err, docs)

            {
                if(!err)
                    res.json(docs);
                else
                    res.send(err);
            });


    });


router.route('/gamespopular')
    .get(function(req, res) {
        Pitches.find().sort('-likes.count')
            .limit(5)
            .exec(function(err, docs)

            {
                if(!err)
                    res.json(docs);
                else
                    res.send(err);
            });


    });
*/

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
