/**
 * Created by subtainishfaq on 3/22/17.
 */
angular.module('yapp')
  .controller('MeetingCtrl', function($scope, $state,SeatEatsConstants,pitchesService,$rootScope,toastr,$localStorage,$stateParams,$firebaseArray) {

    $scope.model={};
    $scope.firebaseObj={};
    $scope.firebaseObj.user=$stateParams.leadid;
    $scope.selectOptionTeamLead = {
      filter: "contains",
      placeholder: "Select Type...",
      dataTextField: "name",
      dataValueField: "_id",
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
            url: SeatEatsConstants.AppUrlApi+"usersteamlead",
            beforeSend: function(req) {

              req.setRequestHeader('Authorization', $localStorage.currentUser.token);
            }
          }
        }
      }
    };

    $scope.AssignToLead=function () {
     // var user=$localStorage.currentUser.userId;
      var postObject = {
        userId : $scope.model.teamLead,
        meetingDetail :
          {
            meetingDate : $scope.model.meetingDate,
            leadId : $stateParams.leadid
          }
      }

    }

  });
