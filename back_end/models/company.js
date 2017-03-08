/**
 * Created by subtainishfaq on 10/18/16.
 */

var mongoose=require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var uniqueValidator = require('mongoose-unique-validator');


var Schema=mongoose.Schema;

var companySchema = new Schema({
    companyName: String,
    companyType: String,
    companyContactNumber:String,
    companyBillingAddress: String,
    companyEmail: String,
    companyDescription : String,
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    contactPersons:[
        {
            contactPersonName:String,
            contactPersonDesignation:String,
            contactPersonContactNumber:String,
            contactPersonEmail:String,
            contactPersonContactType:String,
            contactPersonIsDecisionMaker:String,
            contactPersonIsClientNew:String,
            contactPersonRemarks: String
        }]


//array of contact person
});
companySchema.plugin(uniqueValidator);

companySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Company', companySchema);