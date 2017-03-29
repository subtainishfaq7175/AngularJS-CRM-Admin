/**
 * Created by subtainishfaq on 3/22/17.
 */
angular.module('yapp')
  .controller('UserMeetingCtrl', function($scope, $state,SeatEatsConstants,pitchesService,$rootScope,toastr,$localStorage,$stateParams,usermeetingService,simpleObj) {

    debugger;
    $scope.mainGridOptions={
      dataSource: {
        data:  simpleObj.data.meetings
      },

      filterable: {
        mode: "row"
      },
      columns: [{
        title: "Lead Name",
        width: "120px",
        template: '<a class="btn k-primary btn-outline btn-rounded btn-sm">{{dataItem.leadId.pitchTitle}}</a>'
      },{
        title: "Meeting Time",
        width: "120px",
        template: '<p>{{dataItem.meetingDate}}</p>'
      }]

    };

  });
