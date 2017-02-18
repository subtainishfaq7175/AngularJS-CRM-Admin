/**
 * Created by subtainishfaq on 11/4/16.
 */
/**
 * Created by subtainishfaq on 10/13/16.
 */


angular.module("yapp").factory('fieldvalidationService',['$http','SeatEatsConstants', function($http,SeatEatsConstants){

  var fieldvalidation = {};
  fieldvalidation.deletsProfilesById=function (id)
  {
    return $http.delete(SeatEatsConstants.AppUrlApi+'users/'+ id);

  };

  fieldvalidation.getProfileById=function (id)
  {
    return $http.get(SeatEatsConstants.AppUrlApi+'users/'+ id);

  };fieldvalidation.updateProfile=function (obj)
  {
    return $http.put(SeatEatsConstants.AppUrlApi+'users/'+ obj._id,obj);

  };

  return fieldvalidation;

}]);
