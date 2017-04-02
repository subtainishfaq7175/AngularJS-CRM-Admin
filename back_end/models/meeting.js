/**
 * Created by subtainishfaq on 10/18/16.
 */

var mongoose=require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var uniqueValidator = require('mongoose-unique-validator');


var Schema=mongoose.Schema;

var meetingSchema = new Schema({

            meetingDate:{ type:Date, default : Date.now()},
            leadId : {type: mongoose.Schema.Types.ObjectId, ref: 'Pitch'}
        }


//array of contact person
, {strict: false});
meetingSchema.plugin(uniqueValidator);

meetingSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Meeting', meetingSchema);