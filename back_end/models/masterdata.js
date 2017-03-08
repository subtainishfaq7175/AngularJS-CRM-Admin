/**
 * Created by subtainishfaq on 10/18/16.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');


var masterdataSchema = new Schema({
    title: String,
    content:String,
    secondary:String,
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created_time:  { type: Date, default: Date.now },
    content_type:String
});



masterdataSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Masterdata', masterdataSchema);