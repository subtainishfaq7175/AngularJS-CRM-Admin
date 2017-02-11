/**
 * Created by subtainishfaq on 10/18/16.
 */

var mongoose=require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema=mongoose.Schema;

var pitchSchema = new Schema({

    pitchType :  {type:String },
    pitchTitle:{type :String},// this will ListOfValues
    contactType :  {type:String },// this will ListOfValues
    companyName :  {type:String },
    companyType :  {type:String },// this will ListOfValues
    contactPerson :  {type:String },
    designation :  {type:String },
    decisionMaker :  {type:Boolean },
    contactNumber :  {type:String },
    location :  {type:String },
    requestedServiceType :  {type:String },// this will ListOfValues
    pitchStatusType :  {type:String },// this will ListOfValues
    assignedTeamLeader :  {type:String }, // this will be Employee
    assignedSalesPerson :  {type:String }, // this will be Employee
    pitchClientType :  {type:String }, // this will be ListOfValue
    pitchClientResponseType :  {type:String }, // this will be ListOfValue
    pitchClientCurrentServiceType :  {type:String }, // this will be ListOfValue
    isPitchClientNew :  {type:Boolean},
    pitchStatusRemarks :  {type:String },
    pitchSalesPersonRemarks :  {type:String },
    pitchExpectedBusiness :  {type:Number },
    pitchActualBusiness :  {type:Number },
    pitchCurrencyType :  {type:String }, // this will be ListOfValue
    pitchSourceType :  {type:String }, // this will be ListOfValue
    followUpCount :  {type:String },
    createdDate: { type:Date , default: Date.now() },
    scheduelDate: { type:Date , default: Date.now() },
    role: { type :Number ,default : 0 },
    gender : { type:String },
    age : { type:Number }
});

pitchSchema.plugin(mongoosePaginate);



module.exports = mongoose.model('Pitch', pitchSchema);