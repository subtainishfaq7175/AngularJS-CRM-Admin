
/**
 * Created by subtainishfaq on 10/18/16.
 */
var Meeting = require('../models/meeting');
var express = require('express');
var jwt    = require('jwt-simple');
var config      = require('../config/database');
var passport	= require('passport');
var User = require('../models/user');

var router = express.Router();

router.route('/meetingssearch').get(function(req, res) {
    var filtValue =req.query.filter.filters[0].value;

    Meeting.paginate({"meetingName":{ "$regex": "^"+filtValue, "$options": "i" }}, { page : req.param('page'), limit: 10 ,sort: { created_time: 'desc' }}, function(error, pageCount, paginatedResults) {
        if (error) {
            console.error(error);
            res.send(error);
        } else {

            res.json(pageCount);
        }
    });

});


router.route('/contactssearch/:id').get(function(req, res) {
    var filtValue =req.query.filter.filters[0].value;

    Meeting.findOne({_id:req.params.id},{ "contactPersons": {$elemMatch: {contactPersonName :{ "$regex": "^"+filtValue, "$options": "i" }}}},function(err,persons)
    {
        console.log(persons);
        res.json(persons);
    })

});

router.route('/meeting').get(function(req, res) {

    Meeting.paginate({}, { page : req.param('page'), limit: 10 ,sort: { created_time: 'desc' }}, function(error, pageCount, paginatedResults) {
        if (error) {
            console.error(error);
            res.send(error);
        } else {
            //  console.log('Pages:', pageCount);
            //  console.log(paginatedResults);
            res.json(pageCount);
        }
    });

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
                   // var meeting = new Meeting(req.body);

                    Meeting.findOne({userId : req.body.userId},function (err,returnedMeeting) {

                        if(returnedMeeting==null)
                        {
                            var meetingObj = {};
                            meetingObj.userId=req.body.userId;
                            meetingObj.meetings =[];
                            meetingObj.meetings.push(req.body.meetingDetail);
                            var meeting = new Meeting(meetingObj);
                            meeting.save(function(err,meet) {
                                if (err) {

                                    err.isError=true;
                                    return res.send(err);
                                }

                                res.send( meet );
                            });

                        }

                        else
                            {
                                returnedMeeting.update(
                                    {$push: {"meetings":req.body.meetingDetail}},
                                    {safe: true, upsert: true, new : true},
                                    function(err, model) {
                                        console.log(err);

                                        res.json(model);

                                    }
                                );
                             //for Particular user id , push unique meeting in that userid
                            }

                    });

                    // Meeting.update({userId: meeting.userId}, meeting, {upsert: true, setDefaultsOnInsert: true}, function(err) {
                    //     if (err) {
                    //
                    //         err.isError=true;
                    //         return res.send(err);
                    //             }
                    //
                    //     res.send({ message: 'Meeting Added' });
                    //     });
                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'No token provided.'});
        }
    });


router.route('/meeting/:id').put(function(req,res){


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
                Meeting.findOne({ _id: req.params.id }, function(err, meeting) {
                    if (err) {
                        return res.send(err);
                    }

                    for (prop in req.body) {
                        meeting[prop] = req.body[prop];
                    }

                    // save the meeting
                    meeting.save(function(err) {
                        if (err) {
                            return res.send(err);
                        }

                        res.json({ message: 'Meeting updated!' });
                    });
                });


            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }


});


router.route('/meeting/:id').get(function(req, res) {
    Meeting.findOne({ userId: req.params.id}, function(err, meeting) {
        if (err) {
            return res.send(err);
        }

        var opts = [
            { path: 'meetings.leadId', select: 'pitchTitle' ,model: 'Pitch' }
        ];

        Meeting.populate(meeting, opts, function (err, populatedMeeting) {
            console.log(populatedMeeting);
            res.json(populatedMeeting);

        });

    })
});


router.route('/meeting/:id').delete(function(req, res) {
    Meeting.remove({
        _id: req.params.id
    }, function(err, meeting) {
        if (err) {
            return res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
    });
});

router.route('/meetingcontact/:idmeeting/:idcontact').delete(function(req, res) {
    // Meeting .update(
    //     { _id: req.params.idmeeting },
    //     { $pull: { "contactPersons" : { _id : req.params.idcontact } } },
    //     { safe: true },
    //     function removeConnectionsCB(err, obj) {
    //         if (err) {
    //             return res.send(err);
    //         }
    //         obj._id=req.params.idmeeting;
    //
    //         res.json(obj);
    //     });
});


router.route('/meetingcontact/:idmeeting/:idcontact').get(function(req, res) {
    // Meeting.
    // findOne({'contactPersons': {$elemMatch: {_id: req.params.idcontact}}},
    //     function removeConnectionsCB(err, obj) {
    //     if (err) {
    //         return res.send(err);
    //     }
    //     console.log(obj);
    //     res.json(obj.contactPersons.id( req.params.idcontact));
    //
    // })

});


router.route('/meetingcontact/:idmeeting').put(function(req, res) {


    Meeting.findByIdAndUpdate(
        req.params.idmeeting,
        {$push: {"contactPersons":req.body}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);

            res.json(model);

        }
    );


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
