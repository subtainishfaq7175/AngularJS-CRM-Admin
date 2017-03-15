/**
 * Created by subtainishfaq on 10/18/16.
 */

var mongoose=require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var uniqueValidator = require('mongoose-unique-validator');


var Schema=mongoose.Schema;

var companySchema = new Schema({
    companyName: { type:String,unique: true},
    companyType: String,
    companyContactNumber:String,
    companyBillingAddress: String,
    companyEmail: String,
    companyDescription : String,
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    contactPersons:[
        {
            contactPersonName:{ type:String,unique: true},
            contactPersonDesignation:String,
            contactPersonContactNumber:{ type:String},
            contactPersonEmail:{ type:String},
            contactPersonContactType:String,
            contactPersonIsDecisionMaker:String,
            contactPersonIsClientNew:String,
            contactPersonRemarks: String
        }]


//array of contact person
}, {strict: false});
companySchema.plugin(uniqueValidator);

companySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Company', companySchema);