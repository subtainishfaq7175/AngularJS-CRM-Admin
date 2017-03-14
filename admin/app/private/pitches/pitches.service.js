/**
 * Created by subtainishfaq on 11/4/16.
 */
/**
 * Created by subtainishfaq on 10/13/16.
 */

angular.module("yapp").factory('pitchesService',['$http','SeatEatsConstants', function($http,SeatEatsConstants){

  var game = {};

  game.getNewsList= function ()
  {

    var promise = $http.get(SeatEatsConstants.AppUrlApi+'games');
    return promise;
  };
  game.getCities= function ()
  {

    var promise = $http.get("countriesToCities.json");
    return promise;
  };
  game.getPitchById= function (ID)
  {
debugger;
    var promise = $http.get(SeatEatsConstants.AppUrlApi+'pitches/'+ID);
    return promise;
  };

  game.deletePitchById= function (ID)
  {

    var promise = $http.delete(SeatEatsConstants.AppUrlApi+'pitches/'+ID);
    return promise;
  };


  game.postPitch=function (obj)
  {
      return $http.post(SeatEatsConstants.AppUrlApi+'pitches/', obj);


  };
 game.putPitch=function (obj)
  {
      return $http.put(SeatEatsConstants.AppUrlApi+'pitches/'+obj._id, obj);


  };


  return game;

}]);
