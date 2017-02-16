/**
 * Created by subtainishfaq on 11/4/16.
 */
/**
 * Created by subtainishfaq on 10/13/16.
 */

angular.module("yapp").factory('companiesService',['$http','SeatEatsConstants', function($http,SeatEatsConstants){

  var companies = {};

  companies.getLetsplayById= function (ID)
  {

    var promise = $http.get(SeatEatsConstants.AppUrlApi+'companiess/'+ID);
    return promise;
  };
  companies.putLetsplay= function (obj)
  {

    var promise = $http.put(SeatEatsConstants.AppUrlApi+'companiess/'+obj._id,obj);
    return promise;
  };

  companies.deleteLetsplayById= function (ID)
  {

    var promise = $http.delete(SeatEatsConstants.AppUrlApi+'companiess/'+ID);
    return promise;
  };



  companies.postLetsplay=function (obj)
  {
    return $http.post(SeatEatsConstants.AppUrlApi+'companiess', obj)

  };
  return companies;

}]);
