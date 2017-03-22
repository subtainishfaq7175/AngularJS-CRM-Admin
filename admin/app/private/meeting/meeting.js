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
    console.log($stateParams.leadid);
    $scope.AssignToLead=function () {
      $scope.firebaseObj.user=$stateParams.leadid;
      $scope.firebaseObj.meetingDetails=$scope.model;
      var ref=firebase.database().ref();
      var ref=ref.child("meetings");
      var list = $firebaseArray(ref);
      list.$add(
        $scope.firebaseObj
      ).then(function (respons) {
        console.log(respons)

      });
    }

  });
