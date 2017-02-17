/**
 * Created by subtainishfaq on 11/4/16.
 */
/**
 * Created by subtainishfaq on 10/13/16.
 */

angular.module("yapp").factory('ContactPersonService',['$http','SeatEatsConstants', function($http,SeatEatsConstants){

  var companies = {};

  companies.getLetsplayById= function (ID)
  {

    var promise = $http.get(SeatEatsConstants.AppUrlApi+'contactPerson/'+ID);
    return promise;
  };
  companies.putLetsplay= function (obj)
  {

    var promise = $http.put(SeatEatsConstants.AppUrlApi+'contactPerson/'+obj._id,obj);
    return promise;
  };

  companies.deleteLetsplayById= function (ID)
  {

    var promise = $http.delete(SeatEatsConstants.AppUrlApi+'contactPerson/'+ID);
    return promise;
  };



  companies.postLetsplay=function (obj)
  {
    return $http.post(SeatEatsConstants.AppUrlApi+'contactPerson', obj)

  };
  return companies;

}]);
