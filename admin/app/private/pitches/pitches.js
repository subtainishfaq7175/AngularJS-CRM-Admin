/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('PitchesCtrl', function($scope, $state,SeatEatsConstants,pitchesService,$rootScope,toastr,$localStorage) {

    $scope.$state = $state;

    $scope.editPitch = function (ID) {
      $state.go('pitchesedit',{id:ID});
    };

    $scope.emailClient = function (ID) {

      $state.go('emailclient',{id:ID});
    };

    $scope.planMeeting = function (ID) {

      $state.go('meeting',{leadid:ID});
    };

    $scope.deletePitch = function (ID) {
      $rootScope.scopeWorkingVariable = true;

      pitchesService.deletePitchById(ID).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        $state.reload();

      });

    };

    $scope.mainGridOptions={
      dataSource: {
        type: "json",
        transport: {
          read:{
            url: SeatEatsConstants.AppUrlApi+'pitches',
            beforeSend: function(req) {

              req.setRequestHeader('Authorization', $localStorage.currentUser.token);
            }
          }

        },

          schema: {
            data: "docs",
            total: "total"
          }
        ,
        pageSize: 10,
        serverPaging: true,
        serverSorting: true
      },
      sortable: true,
      pageable: true,

      filterable: {
      mode: "row"
    },


      columns: [{
        field: "pitchTitle",
        title: "title",
        width: "120px",
        filterable: {
          cell: {
            showOperators: false,
            operator: "contains"

          }
        }
      },{
        title: "Email",
        width: "120px",
        template: '<a ng-click="emailClient(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Email Client</a>'
      },{
        title: "Edit",
        width: "120px",
        template: '<a ng-click="editPitch(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Edit</a>'
      },
        {
          title: "Meeting",
          width: "120px",
          template: '<a ng-click="planMeeting(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Plan Meeting</a>'
        }
        ,{
        title: "Delete",
        width: "120px",
        template: '<a ng-click="deletePitch(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Delete</a>'
      }]
    };

    $scope.mainGridDraftOptions={
      dataSource: {
        type: "json",
        transport: {
          read:{
            url: SeatEatsConstants.AppUrlApi+'pitchesdraft',
            beforeSend: function(req) {

              req.setRequestHeader('Authorization', $localStorage.currentUser.token);
            }
          }

        },

          schema: {
            data: "docs",
            total: "total"
          }
        ,
        pageSize: 10,
        serverPaging: true,
        serverSorting: true
      },
      sortable: true,
      pageable: true,

      filterable: {
      mode: "row"
    },


      columns: [{
        field: "pitchTitle",
        title: "title",
        width: "120px",
        filterable: {
          cell: {
            showOperators: false,
            operator: "contains"

          }
        }
      },{
        title: "Email",
        width: "120px",
        template: '<a ng-click="emailClient(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Email Client</a>'
      },
        {
        title: "Edit",
        width: "120px",
        template: '<a ng-click="editPitch(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Edit</a>'
      },
        {
        title: "Meeting",
        width: "120px",
        template: '<a ng-click="planMeeting(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Plan Meeting</a>'
      },{
        title: "Delete",
        width: "120px",
        template: '<a ng-click="deletePitch(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Delete</a>'
      }]
    };

  });
