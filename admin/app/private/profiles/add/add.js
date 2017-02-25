/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('ProfilesAddCtrl', function($scope, $state,profilesService,$rootScope,toastr,AuthenticationService,$location,$localStorage,SeatEatsConstants) {


    $scope.$state = $state;
    $scope.model = {};

    $scope.selectOptionsUsers = {
      filter: "contains",
      placeholder: "Select Currency Type...",
      dataTextField: "name",
      dataValueField: "name",
      valuePrimitive: true,
      autoBind: false,
      animation: {
        close: {
          effects: "zoom:out",
          duration: 500
        }
      },
      dataSource: {
        type: "json",
        serverFiltering: true,
        transport: {
          read: {
            url: SeatEatsConstants.AppUrlApi+"usersunassigned",
            beforeSend: function(req) {

              req.setRequestHeader('Authorization', $localStorage.currentUser.token);
            }
          }
        }
      }
    };

    $scope.publishAssignment=function ()
    {
      $rootScope.scopeWorkingVariable = true;

      AuthenticationService.Assignment($scope.model.assignedUser).then(function (res) {

       debugger;

        $rootScope.scopeWorkingVariable = false;
        debugger;
        if (res.status === 200) {
          toastr.success('Done','Operation Complete');
          $state.go("profiles");
        } else {
          toastr.error('Error','Operation Was not complete');
        }

      });


    };





  });
