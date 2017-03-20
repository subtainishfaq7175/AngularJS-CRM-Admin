/**
 * Created by subtainishfaq on 11/4/16.
 */
/**
 * Created by subtainishfaq on 10/13/16.
 */

angular.module("yapp").factory('contactpersonService',['$http','SeatEatsConstants', function($http,SeatEatsConstants){

  var companies = {};

  companies.getCompanyContactPersons= function (ID)
  {

    var promise = $http.get(SeatEatsConstants.AppUrlApi+'company/'+ID);// this id is of company
    return promise;
  };

  companies.getCompanyContactPersonsCoversion= function (ID,contact)
  {

    var promise = $http.get(SeatEatsConstants.AppUrlApi+'companycontactconversion/'+ID+'/'+contact);// this id is of company
    return promise;
  };
  companies.getContactPerson= function (companyID,contactID)
  {

    var promise = $http.get(SeatEatsConstants.AppUrlApi+'companycontact/'+companyID +'/'+contactID);// this is the id of contact person
    return promise;
  };
  companies.putContactPerson= function (obj,idcompany)
  {

    var promise = $http.put(SeatEatsConstants.AppUrlApi+'contactPersonEdit/'+idcompany+'/'+obj._id,obj);
    return promise;
  };
  companies.addContactCompany= function (obj,companyid)
  {

    var promise = $http.put(SeatEatsConstants.AppUrlApi+'companycontact/'+companyid,obj);//call service for contact copmany , to add person in specific contact .
    return promise;
  };

  companies.deleteContact= function (companyID,contactID)
  {

    var promise = $http.delete(SeatEatsConstants.AppUrlApi+'companycontact/'+companyID+'/'+contactID);
    return promise;
  };



  companies.postLetsplay=function (obj)
  {
    return $http.post(SeatEatsConstants.AppUrlApi+'contactPerson', obj)

  };


  companies.sendEmailToServer=function (obj)
  {
    return $http.post(SeatEatsConstants.AppUrlApi+'emailsending', obj)

  };
  return companies;

}]);
