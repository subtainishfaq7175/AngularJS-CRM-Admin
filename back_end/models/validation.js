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
    pitchValidator:{

        pitchType :  { type:Boolean , default: false },
        pitchTitle:{ type:Boolean , default: false },// this will ListOfValues
        location :  { type:Boolean , default: false },
        requestedServiceType :  { type:Boolean , default: false },// this will ListOfValues
        pitchStatusType :  { type:Boolean , default: false },// this will ListOfValues
        assignedTeamLeader :  { type:Boolean , default: false }, // this will be Employee
        assignedSalesPerson :  { type:Boolean , default: false }, // this will be Employee
        pitchClientType :  { type:Boolean , default: false }, // this will be ListOfValue
        pitchClientResponseType :  { type:Boolean , default: false }, // this will be ListOfValue
        pitchClientCurrentServiceType :  { type:Boolean , default: false }, // this will be ListOfValue
        isPitchClientNew :  { type:Boolean , default: false },
        pitchStatusRemarks :  { type:Boolean , default: false },
        pitchSalesPersonRemarks :  { type:Boolean , default: false },
        pitchExpectedBusiness :  { type:Boolean , default: false },
        pitchActualBusiness :  { type:Boolean , default: false },
        pitchCurrencyType :  { type:Boolean , default: false }, // this will be ListOfValue
        pitchSourceType :  { type:Boolean , default: false }, // this will be ListOfValue
        followUpCount :  { type:Boolean , default: false },
        createdDate: { type:Boolean , default: false },
        scheduelDate: { type:Boolean , default: false },
    },
    settings:
        {
            customFeilds :{type:Boolean , default: false}
        }, privilege3:
        {
            createCompany :{type:Boolean , default: false},
            viewCompany :{type:Boolean , default: false},
            createLead :{type:Boolean , default: false},
            viewLead :{type:Boolean , default: false},
            createProfile :{type:Boolean , default: false},
            viewProfile :{type:Boolean , default: false},
            createMasterdata :{type:Boolean , default: false},
            createSetting :{type:Boolean , default: false}
        }, privilege4:
        {
            createCompany :{type:Boolean , default: false},
            viewCompany :{type:Boolean , default: false},
            createLead :{type:Boolean , default: false},
            viewLead :{type:Boolean , default: false},
            createProfile :{type:Boolean , default: false},
            viewProfile :{type:Boolean , default: false},
            createMeeting :{type:Boolean , default: false},
            viewMeeting :{type:Boolean , default: false},
            createMasterdata :{type:Boolean , default: false},
            createSetting :{type:Boolean , default: false}
        }, privilege1:
        {
            createCompany :{type:Boolean , default: true},
            viewCompany :{type:Boolean , default: true},
            createLead :{type:Boolean , default: true},
            viewLead :{type:Boolean , default: true},
            createProfile :{type:Boolean , default: true},
            viewProfile :{type:Boolean , default: true},
            createMeeting :{type:Boolean , default: true},
            viewMeeting :{type:Boolean , default: true},
            createMasterdata :{type:Boolean , default: true},
            createSetting :{type:Boolean , default: true}
        }
},{strict: false});

validationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Validation', validationSchema);