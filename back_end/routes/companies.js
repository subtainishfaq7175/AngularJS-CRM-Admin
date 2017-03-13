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

        Company.paginate({"title":{ "$regex": "^"+req.param('query'), "$options": "i" }}, { page : req.param('page'), limit: 10 ,sort: { created_time: 'desc' }}, function(error, pageCount, paginatedResults) {
            if (error) {
                console.error(error);
                res.send(error);
            } else {

                res.json(pageCount);
            }
        });

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

router.route('/companyslikes/:id').get(function(req,res){


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

                    if ( typeof company["likes"] === 'undefined' )
                        company["likes"]={count : 0 , _creator:[]};

                    if(company["likes"]._creator.indexOf(user._id)!== -1)
                    {  var i =company["likes"]._creator.indexOf(user._id);
                        company["likes"]._creator.pull(user._id );
                        company["likes"].count--;
                        company.save();
                        console.log(i);
                        return res.json({message: "duplicate"});

                    }


                    company["likes"]._creator.push(user._id);
                    company["likes"].count++;


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


router.route('/companysdislikes/:id').get(function(req,res){


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


                    if ( typeof company["dislikes"] === 'undefined' )
                        company["dislikes"]={count : 0 , _creator:[]};

                    if(company["dislikes"]._creator.indexOf(user._id)!== -1)
                    { var i =company["dislikes"]._creator.indexOf(user._id);
                        company["dislikes"]._creator.pull(user._id );
                        company["dislikes"].count--;
                        company.save();
                        return res.json({message: "duplicate"});

                    }


                    company["dislikes"]._creator.push(user._id);
                    company["dislikes"].count++;






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

router.route('/companysfavourites/:id').get(function(req,res){


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

                    if ( typeof company["favourites"] === 'undefined' )
                        company["favourites"]={count : 0 , _creator:[]};

                    if(company["favourites"]._creator.indexOf(user._id)!== -1)
                    {   var  i=company["favourites"]._creator.indexOf(user._id);
                        company["favourites"]._creator.pull( user._id);
                        company["favourites"].count--;
                        company.save();
                        return res.json({message: "duplicate"});

                    }

                    company["favourites"]._creator.push(user._id);
                    company["favourites"].count++;

                    if ( typeof user["favourites_games"] === 'undefined' )
                        user.favourite_company=[];

                    user.favourite_company.push(company._id);
                    user.save();



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
        { $pull: { contactPersons : { _id : req.params.idcontact } } },
        { safe: true },
        function removeConnectionsCB(err, obj) {
            if (err) {
                return res.send(err);
            }
            obj._id=req.params.idcompany;

            res.json(obj);
        });
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
