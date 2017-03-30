'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($scope, $state,AuthenticationService,$rootScope,$localStorage) {

    $scope.$state = $state;
    $scope.logout = logout;
   $scope.privilege= $localStorage.currentUser.validation["privilege"+$rootScope.roleId];

    function logout() {
      // reset login status
      AuthenticationService.Logout();
      $state.go('login');

    };


  });
