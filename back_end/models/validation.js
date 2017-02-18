/**
 * Created by subtainishfaq on 12/6/16.
 */
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var validationSchema = new Schema({
    companyValidator:{
        companyName: { type:Boolean , default: false },
        companyType: { type:Boolean , default: false },
        companyContactNumber:{ type:Boolean , default: false },
        companyBillingAddress: { type:Boolean , default: false },
        companyEmail: { type:Boolean , default: false },
        companyDescription : { type:Boolean , default: false },
        contactPersons:
            {
                contactPersonName:{ type:Boolean , default: false },
                contactPersonDesignation:{ type:Boolean , default: false },
                contactPersonContactNumber:{ type:Boolean , default: false },
                contactPersonEmail:{ type:Boolean , default: false },
                contactPersonContactType:{ type:Boolean , default: false },
                contactPersonIsDecisionMaker:{ type:Boolean , default: false },
                contactPersonIsClientNew:{ type:Boolean , default: false },
                contactPersonRemarks: { type:Boolean , default: false }
            }

    },
    leadValidator:{

        leadType :  { type:Boolean , default: false },
        leadTitle:{ type:Boolean , default: false },// this will ListOfValues
        location :  { type:Boolean , default: false },
        requestedServiceType :  { type:Boolean , default: false },// this will ListOfValues
        leadStatusType :  { type:Boolean , default: false },// this will ListOfValues
        assignedTeamLeader :  { type:Boolean , default: false }, // this will be Employee
        assignedSalesPerson :  { type:Boolean , default: false }, // this will be Employee
        leadClientType :  { type:Boolean , default: false }, // this will be ListOfValue
        leadClientResponseType :  { type:Boolean , default: false }, // this will be ListOfValue
        leadClientCurrentServiceType :  { type:Boolean , default: false }, // this will be ListOfValue
        isPitchClientNew :  { type:Boolean , default: false },
        leadStatusRemarks :  { type:Boolean , default: false },
        leadSalesPersonRemarks :  { type:Boolean , default: false },
        leadExpectedBusiness :  { type:Boolean , default: false },
        leadActualBusiness :  { type:Boolean , default: false },
        leadCurrencyType :  { type:Boolean , default: false }, // this will be ListOfValue
        leadSourceType :  { type:Boolean , default: false }, // this will be ListOfValue
        followUpCount :  { type:Boolean , default: false },
        createdDate: { type:Boolean , default: false },
        scheduelDate: { type:Boolean , default: false },
    }
});

validationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Validation', validationSchema);