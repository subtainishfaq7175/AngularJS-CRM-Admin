/**
 * Created by subtainishfaq on 10/18/16.
 */
var Company = require('../models/company');
var express = require('express');
var jwt    = require('jwt-simple');
var config      = require('../config/database');
var passport	= require('passport');
var User = require('../models/user');

var router = express.Router();

router.route('/companyssearch')
    .get(function(req, res) {
        var filtValue =req.query.filter.filters[0].value;

        Company.paginate({"companyName":{ "$regex": "^"+filtValue, "$options": "i" }}, { page : req.param('page'), limit: 10 ,sort: { created_time: 'desc' }}, function(error, pageCount, paginatedResults) {
            if (error) {
                console.error(error);
                res.send(error);
            } else {

                res.json(pageCount);
            }
        });

});
router.route('/contactssearch')
    .get(function(req, res) {
        var filtValue =req.query.filter.filters[0].value;

        Company.find({},{ "contactPersons": {$elemMatch: {contactPersonName: filtValue}}},function(err,persons)
        {
            console.log(persons);
            res.json(persons);
        })

});

router.route('/companyscount/:id')
    .get(function(req, res) {

     var  query = Company.findOne({ _id: req.params.id }).select({ "likes": 1,  "favourites": 1, "dislikes": 1, "_id": 0});

        query.exec(function (err, someValue) {
            if (err)     res.send(err);
            else
            {
                res.json(someValue);
            }

        });



    });


router.route('/companysfilter')
    .get(function(req, res) {

    var    andingParams=[];
    var    sorting={};
    var isTrueSet;

        if(typeof req.param('from')!== 'undefined')
            andingParams.push({"created_time": {"$gte": new Date(req.param('from'))}});
        if(typeof req.param('to')!== 'undefined')
            andingParams.push({"created_time": {"$lte": new Date(req.param('to'))}});
        if(typeof req.param('censored')!== 'undefined' && req.param('censored')!=="all")
        {
            isTrueSet = req.param('censored')=='true';

            andingParams.push({"is_censored": isTrueSet});
        }
        if(typeof req.param('language')!== 'undefined' && req.param('language')!=='all')
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



        //if(typeof req.param('orderby')!== 'undefined')


        Company.paginate(query, { page : req.param('page'), limit: 10 ,sort: sorting}, function(error, pageCount, paginatedResults) {
            if (error) {
                console.error(error);
                res.send(error);
            } else {

                res.json(pageCount);
            }
        });

});

router.route('/company')
    .get(function(req, res) {

        Company.paginate({}, { page : req.param('page'), limit: 10 ,sort: { created_time: 'desc' }}, function(error, pageCount, paginatedResults) {
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
                var company = new Company(req.body);

                company.save(function(err) {
                    if (err) {
                        return res.send(err);
                    }

                    res.send({ message: 'Company Added' });
                });

            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

router.route('/company/:id').put(function(req,res){


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
                Company.findOne({ _id: req.params.id }, function(err, company) {
                    if (err) {
                        return res.send(err);
                    }

                    for (prop in req.body) {
                        company[prop] = req.body[prop];
                    }

                    // save the company
                    company.save(function(err) {
                        if (err) {
                            return res.send(err);
                        }

                        res.json({ message: 'Company updated!' });
                    });
                });


            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }


});


router.route('/company/:id').get(function(req, res) {
    Company.findOne({ _id: req.params.id}, function(err, company) {
        if (err) {
            return res.send(err);
        }

        res.json(company);
    });
});


router.route('/companycontactconversion/:idcompany/:idcontact').get(function(req, res) {

    Company .update(
        {_id: req.params.idcompany, 'contactPersons._id': req.params.idcontact},
        {'$set': {
            'contactPersons.$.isCoverted': true
        }},
        function(err, numAffected)
        {

            if (err) {
                return res.send(err);
            }

            Company.findOne({ _id: req.params.idcompany}, function(err, company) {
                if (err) {
                    return res.send(err);
                }

                res.json(company);
            });
        }
    );
});

router.route('/company/:id').delete(function(req, res) {
    Company.remove({
        _id: req.params.id
    }, function(err, company) {
        if (err) {
            return res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
    });
});

router.route('/companycontact/:idcompany/:idcontact').delete(function(req, res) {
    Company .update(
        { _id: req.params.idcompany },
        { $pull: { "contactPersons" : { _id : req.params.idcontact } } },
        { safe: true },
        function removeConnectionsCB(err, obj) {
            if (err) {
                return res.send(err);
            }
            obj._id=req.params.idcompany;

            res.json(obj);
        });
});


router.route('/companycontact/:idcompany/:idcontact').get(function(req, res) {
   Company.
   findOne({'contactPersons': {$elemMatch: {_id: req.params.idcontact}}},
       function removeConnectionsCB(err, obj) {
       if (err) {
           return res.send(err);
       }
       console.log(obj);
       res.json(obj.contactPersons.id( req.params.idcontact));

   })});


router.route('/companycontact/:idcompany').put(function(req, res) {


    Company.findByIdAndUpdate(
        req.params.idcompany,
        {$push: {"contactPersons":req.body}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            console.log(err);

            res.json(model);

        }
    );


});


router.route('/contactPersonEdit/:idcompany/:idcontact').put(function(req, res) {

    Company .update(
        {_id: req.params.idcompany, 'contactPersons._id': req.params.idcontact},
        {'$set': {
            'contactPersons.$': req.body
        }},
        function(err, numAffected)
        {

            if (err) {
                return res.send(err);
            }

            res.json({_id:req.params.idcompany});
        }
    );


});



router.route('/companysupdate')
    .get(function(req, res) {
        if (typeof req.param('language') != 'undefined' )
        Company.find({'$or':[{"language":{ "$regex": req.param('language'), "$options": "i" }},{"episodes.language":{ "$regex": req.param('language'), "$options": "i" }} ]},function(err, company) {
            if (err) {
                return res.send(err);
            }

            res.json(company);
        }).limit(5);

        else
            Company.find(function(err, company) {
                if (err) {
                    return res.send(err);
                }

                res.json(company);
            }).limit(5);

    });
router.route('/companyfeed/')
    .get(function(req, res) {
        Company.find({is_feed:true},function(err, company) {
            if (err) {
                return res.send(err);
            }

            res.json(company);
        })
    });


router.route('/companyfavourite')
    .get(function(req, res) {
        Company.find().sort('-favourites.count')
            .limit(5)
            .exec(function(err, docs)

        {
            if(!err)
            res.json(docs);
            else
            res.send(err);
        });


    });

router.route('/companypopular')
    .get(function(req, res) {
        Company.find().sort('-likes.count')
            .limit(5)
            .exec(function(err, docs)

        {
            if(!err)
            res.json(docs);
            else
            res.send(err);
        });


    });

router.route('/companyimage/')
    .post(function(req, res) {
        var sampleFile;

        if (!req.files) {
            res.send('No files were uploaded.');
            return;
        }

        sampleFile = req.files.sampleFile;

      var  fileLoc='./public/images/'+Date.now()+(sampleFile.name.replace(/ /g,''));
        console.log(fileLoc);
        sampleFile.mv(fileLoc, function (err) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json({url: req.protocol + '://' + req.get('host')+fileLoc.substring(1)});
            }
        })
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
