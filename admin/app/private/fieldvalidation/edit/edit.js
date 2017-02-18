/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('FieldvalidationEditCtrl', function($scope, $state,fieldvalidationService,simpleObj,$rootScope,toastr) {

    $scope.$state = $state;
    $scope.model=simpleObj.data;
    console.log($scope.model);
    $scope.publishProfile=function ()
    {
      $rootScope.scopeWorkingVariable = true;

      fieldvalidationService.updateProfile($scope.model).then(function (response)
      {

        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        console.log(response);
        $state.go("fieldvalidation");

      })
    };




  });
