/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('FieldvalidationCtrl', function($scope, $state, SeatEatsConstants,fieldvalidationService,simpleObj,$rootScope,toastr,$localStorage) {

    $scope.$state = $state;
    $scope.model=simpleObj.data;

    $scope.publishValidator=function () {
      $rootScope.scopeWorkingVariable = true;
      fieldvalidationService.updateValidation($scope.model).then(function (response) {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
        {
          $localStorage.currentUser.validation=response.data;
          toastr.success('Done','Operation Complete');

        }
        else
          toastr.error('Error','Operation Was not complete');
        debugger;
        console.log(response);

        $state.go("home");


      });

    };
  /*  $scope.editProfile = function (ID) {
   /!*   console.log(ID);

      $state.go('fieldvalidationedit',{id:ID});*!/
    };
    $scope.deleteProfile = function (ID) {
/!*      console.log(ID);
      $rootScope.scopeWorkingVariable = true;

      fieldvalidationService.deletsProfilesById(ID).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        $state.reload();

      });

      $state.go('fieldvalidation',{id:ID});*!/
    };*/



  });
