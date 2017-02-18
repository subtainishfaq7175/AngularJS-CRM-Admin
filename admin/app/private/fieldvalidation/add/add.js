/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('FieldvalidationAddCtrl', function($scope, $state,fieldvalidationService,$rootScope,toastr,AuthenticationService,$location) {


    $scope.$state = $state;
    $scope.model = {};

    $scope.publishProfile=function ()
    {
      $rootScope.scopeWorkingVariable = true;

      AuthenticationService.SignUp($scope.model.name, $scope.model.password, function (result)
      {
        $rootScope.scopeWorkingVariable = false;
          debugger;
        if (result === true) {
          toastr.success('Done','Operation Complete');
        $state.go("fieldvalidation");
        } else {
          toastr.error('Error','Operation Was not complete');
        }


      });


    };





  });
