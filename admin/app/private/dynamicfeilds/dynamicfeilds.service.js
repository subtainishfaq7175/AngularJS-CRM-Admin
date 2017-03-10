/**
 * Created by subtainishfaq on 11/4/16.
 */
/**
 * Created by subtainishfaq on 10/13/16.
 */


angular.module("yapp").factory('dynamicfeildsService',['$http','SeatEatsConstants', function($http,SeatEatsConstants){

  var fieldvalidation = {};
  fieldvalidation.deletsProfilesById=function (id)
  {
    return $http.delete(SeatEatsConstants.AppUrlApi+'users/'+ id);

  };

  fieldvalidation.getValidation=function ()
  {
    return $http.get(SeatEatsConstants.AppUrlApi+'validation/');

  };

 fieldvalidation.updateValidation=function (obj)
  {
    if(angular.isDefined(obj._id))
    return $http.put(SeatEatsConstants.AppUrlApi+'validation/',obj);
    else
     return $http.post(SeatEatsConstants.AppUrlApi+'validation', obj)

  };


  return fieldvalidation;

}]);
