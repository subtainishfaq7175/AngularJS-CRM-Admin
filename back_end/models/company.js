/**
 * Created by subtainishfaq on 10/18/16.
 */

var mongoose=require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema=mongoose.Schema;

var companySchema = new Schema({
    companyName: String,
    companyType: String,
    companyContactNumber:String,
    companyBillingAddress: String,
    companyEmail: String,
    companyDescription : String


//array of contact person
});
companySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Company', companySchema);