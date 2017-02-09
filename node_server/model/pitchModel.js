 //node module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*Database Collection Schema*/
 var pitchSchema = mongoose.Schema({

    pitchType :  {type:String },// this will ListOfValues
    contactType :  {type:String },// this will ListOfValues
    companyName :  {type:String },
    companyType :  {type:String },// this will ListOfValues
    contactPerson :  {type:String },
    designation :  {type:String },
    decisionMaker :  {type:Boolean },
    contactNumber :  {type:String },
    location :  {type:String },
    requestedServiceType :  {type:String },// this will ListOfValues
    assignedTeamLeader :  {type:String }, // this will be Employee
    assignedSalesPerson :  {type:String }, // this will be Employee
    pitchStatusType :  {type:String }, // this will be ListOfValue
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
    role: { type :Number ,default : 0 },
    gender : { type:String },
    age : { type:Number }
  });

/*Instance of my collection*/
 var pitch = mongoose.model('pitch', pitchSchema);

/*Method that fire's Database Queries*/
 module.exports={
	//get all pitchs
	pitchList : function(condition, fields, callback){
		if(!fields)
			fields = {};
		
	pitch.find(condition, fields, callback);
	},

	//update pitch
	pitchEdit : function(condition, data, callback){
		pitch.update(condition, data, callback);
	},

	//save pitch
	pitchAdd : function(data, callback){
		new pitch(data).save(callback);
	},

	//delete employee
	pitchDelete :function(condition, callback){
		pitchs.remove(condition, callback);
	},
	schema : pitch
}
