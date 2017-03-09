/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('ContactPersonCtrl', function($scope, $state,SeatEatsConstants,companiesService,toastr,$rootScope,$stateParams) {

    $scope.$state = $state;
    $scope.companyItem=$stateParams.myParam;
    $scope.conversionToLead = function (item) {

      debugger;
      console.log(item);
      /* var i;
      for ( i=0;i<$scope.companyItem.contactPersons.length;i++)
        if($scope.companyItem.contactPersons[i]._id==ID)
          break;
      $scope.companyItem.editIndex=i;

      $state.go('contactPersonedit',{myParam:$scope.companyItem});
*/
    };

    $scope.editLetsplay = function (ID) {
      var i;
      for ( i=0;i<$scope.companyItem.contactPersons.length;i++)
        if($scope.companyItem.contactPersons[i]._id==ID)
          break;
      $scope.companyItem.editIndex=i;

      $state.go('contactPersonedit',{myParam:$scope.companyItem});

    };

    $scope.goToContactPersonadd=function() {
      $state.go('contactPersonadd',{myParam:$scope.companyItem});

    };

    $scope.deleteLetsplay = function (ID) {

      var i;
      for ( i=0;i<$scope.companyItem.contactPersons.length;i++)
        if($scope.companyItem.contactPersons[i]._id==ID)
          break;

      $scope.companyItem.contactPersons.splice(i,1);


      companiesService.putLetsplay($scope.companyItem).then(function (response) {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');

        $state.go('contactPerson',{myParam:$scope.companyItem});
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
            showOperators: false
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
        template: '<a ng-click="conversionToLead(dataItem)" class="btn k-primary btn-outline btn-rounded btn-sm">Covert to Lead</a>'
      },{
        title: "Delete",
        width: "120px",
        template: '<a ng-click="deleteLetsplay(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Delete</a>'
      }]
    };



  });
