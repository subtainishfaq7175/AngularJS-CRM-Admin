/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('UserprivilegeCtrl', function($scope, $state, SeatEatsConstants,fieldvalidationService,$rootScope,toastr) {

    $scope.$state = $state;
    $scope.editProfile = function (ID) {
   /*   console.log(ID);

      $state.go('fieldvalidationedit',{id:ID});*/
    };
    $scope.deleteProfile = function (ID) {
/*      console.log(ID);
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

      $state.go('fieldvalidation',{id:ID});*/
    };



  });
