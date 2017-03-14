/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('ContactPersonCtrl', function($scope, $state,SeatEatsConstants,contactpersonService,toastr,$rootScope,$stateParams,simpleObj) {

    $scope.$state = $state;
    $scope.companyItem=simpleObj.data; // finally use grid to get companies , within companies get contact person
    $scope.conversionToLead = function (id) {
    //id and simpleObj.data._id , now go to pitchesadd and make the form ...

      console.log(id);

    };

    $scope.editLetsplay = function (ID) {



      $state.go('contactPersonedit',{idcompany:simpleObj.data._id,idcontact:ID});

    };

    $scope.goToContactPersonadd=function() {
      $state.go('contactPersonadd',{id:$stateParams.id});

    };

    $scope.deleteLetsplay = function (ID) {



      contactpersonService.deleteContact($scope.companyItem._id,ID).then(function (response) {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');

        $state.reload();
      })
    };

    $scope.mainGridOptions={
      dataSource: {
        data:  $scope.companyItem.contactPersons,
        schema: {
          model: {
            fields: {
              contactPersonName:{type : "string"},
              contactPersonDesignation:{type : "string"},
              contactPersonContactNumber:{type : "string"},
              contactPersonEmail:{type : "string"},
              contactPersonContactType:{type : "string"},
              contactPersonIsDecisionMaker:{type : "boolean"},
              contactPersonIsClientNew:{type : "boolean"},
              contactPersonRemarks: {type : "string"}
            }
          }
        }
      },

      filterable: {
      mode: "row"
    },
      columns: [{
        field: "contactPersonName",
        title: "title",
        filterable: {
          cell: {
            showOperators: false,
            operator: "contains"

          }
        },
        width: "120px"
      },{
        title: "Edit",
        width: "120px",
        template: '<a ng-click="editLetsplay(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Edit</a>'
      },{
        title: "Operation",
        width: "120px",
        template: '<a ng-click="conversionToLead(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Covert to Lead</a>'
      },{
        title: "Delete",
        width: "120px",
        template: '<a ng-click="deleteLetsplay(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Delete</a>'
      }]
    };



  });
