/**
 * Created by subtainishfaq on 12/6/16.
 */
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var formSchema = new Schema({

}, {strict: false});

formSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Form', formSchema);