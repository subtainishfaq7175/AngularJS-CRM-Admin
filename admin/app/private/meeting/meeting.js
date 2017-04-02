/**
 * Created by subtainishfaq on 3/22/17.
 */
angular.module('yapp')
  .controller('MeetingCtrl', function($scope, $state,SeatEatsConstants,pitchesService,$rootScope,toastr,$localStorage,$stateParams,meetingService) {

    $scope.model={};
    $scope.AssignToLead=function () {
      $rootScope.scopeWorkingVariable = true;


      // var user=$localStorage.currentUser.userId;
    $scope.model.leadId=$stateParams.leadid;
    $scope.model.userTeam=$localStorage.currentUser.team;
    $scope.model.isAssigned=false;
      meetingService.postMeeting($scope.model).then(function (response) {
        $rootScope.scopeWorkingVariable = false;

        if (response.status == 200)
        { toastr.success('Done', 'Operation Complete');
          $state.go("home");
        }
           else
          toastr.error('Error', 'Operation Was not complete');

      });

    }

  });
