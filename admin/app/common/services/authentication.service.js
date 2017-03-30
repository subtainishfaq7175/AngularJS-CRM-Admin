/**
 * Created by subtainishfaq on 11/4/16.
 */
(function () {
  'use strict';

  angular
    .module('yapp')
    .factory('AuthenticationService', Service);

  function Service($http,$localStorage,SeatEatsConstants,$rootScope) {
    var service = {};

    service.Login = Login;
    service.Logout = Logout;
    service.SignUp = SignUp;
    service.Assignment = Assignment;

    return service;

    function Login(username, password, callback) {
      $http.post(SeatEatsConstants.AppUrlApi+'authenticate', { name: username, password: password })
        .success(function (response) {
          // login successful if there's a token in the response
          debugger;

          if (response.token) {
            // store username and token in local storage to keep user logged in between page refreshes
            $localStorage.currentUser = { name: username, token: response.token, validation:response.validation , userId: response.userId ,userLevel:response.userLevel};

            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization = response.token;

            if($localStorage.currentUser.userLevel===3)
            {
              $rootScope.roleId=3;
            }
            else if($localStorage.currentUser.userLevel===4)
            {
              $rootScope.roleId=4
            }
            else if ($localStorage.currentUser.userLevel===1 && username=="super" || username=="admin" )
            {
              $rootScope.roleId=1
            }
            else
            {
              $rootScope.roleId=4;
            }

            // execute callback with true to indicate successful login
            callback(true);
          } else {
            // execute callback with false to indicate failed login
            callback(false);
          }
        });
    }

    function Assignment (id)
    {
      return $http.get(SeatEatsConstants.AppUrlApi+'userssetup/'+ id);

    };

    function SignUp(username, password, callback) {
      $http.post(SeatEatsConstants.AppUrlApi+'signup', { name: username, password: password })
        .success(function (response) {
          // login successful if there's a token in the response
          debugger;

          if (response.success) {
            // store username and token in local storage to keep user logged in between page refreshes
            $localStorage.currentUser = { name: username, token: response.token };

            // add jwt token to auth header for all requests made by the $http service
            $http.defaults.headers.common.Authorization = response.token;



            // execute callback with true to indicate successful login
            callback(true);
          } else {
            // execute callback with false to indicate failed login
            callback(false);
          }
        });
    }


    function Logout() {
      // remove user from local storage and clear http auth header
      delete $localStorage.currentUser;
      $http.defaults.headers.common.Authorization ;
    }
  }
})();
