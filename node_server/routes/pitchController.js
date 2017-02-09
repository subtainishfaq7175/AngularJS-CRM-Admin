var mongoose = require('mongoose');
var pitchCollection = require('../model/pitchModel.js');
var ObjectId = require('mongoose').Types.ObjectId


/*******pitch listing service method**************/
exports.pitchListMethod =  function(req, res){

    pitchCollection.pitchList({}, {}, function(err, resultData){
        if(err){
            res.send({'status' : 'Error',  'data': err});
        }
        else{
            res.send({'status' : 'success',  'data': resultData});

        }

    });
}

/*******pitch Add service method**************/
exports.pitchAddMethod = function(req, res){

    pitchCollection.pitchAdd(req.body.pitch, function(err, resultData){
        if(err){
            res.send({'status' : 'Error',  'data': err});
        }
        else{

            res.send({'status' : 'success',  'data': resultData});
        }

    });

}

/*******pitch Edit service method**************/
exports.pitchEditMethod  =  function(req, res){

    var pitch = req.body.pitch;

    pitchCollection.pitchEdit({"_id": pitch._id}, pitch, function(err, resultData){
        if(err){
            res.send({'status' : 'Error',  'data': err});
        }
        else{
            res.send({'status' : 'success',  'data': resultData});
        }

    });
}

/*******pitch delete service method**************/
exports.pitchDeleteMethod  =  function(req, res){

    pitchCollection.pitchDelete({'_id': ObjectId(req.params._id)},function(err, resultData){
        if(err){
            res.send({'status' : 'Error',  'data': err});
        }
        else{
            res.send({'status' : 'success',  'data': resultData});
        }

    });
}







