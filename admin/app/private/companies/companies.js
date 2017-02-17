/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('CompaniesCtrl', function($scope, $state,SeatEatsConstants,companiesService,toastr,$rootScope) {

    $scope.$state = $state;
    $scope.editLetsplay = function (ID)
    {

      $state.go('companiesedit',{id:ID});
    };

    $scope.addContactPerson = function (dataItem)
    {

      $state.go('contactPerson',{myParam:dataItem});
    };


    $scope.deleteLetsplay = function (ID)
    {
      $rootScope.scopeWorkingVariable = true;

      companiesService.deleteLetsplayById(ID).then(function (response)
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
          read: SeatEatsConstants.AppUrlApi+'company'
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

      columns: [{
        field: "companyName",
        title: "title",
        width: "120px"
      },{
        title: "Contact Person",
        width: "120px",
        template: '<a ng-click="addContactPerson(dataItem)" class="btn k-primary btn-outline btn-rounded btn-sm">Add Contact Person</a>'
      },{
        title: "Edit",
        width: "120px",
        template: '<a ng-click="editLetsplay(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Edit</a>'
      },{
        title: "Delete",
        width: "120px",
        template: '<a ng-click="deleteLetsplay(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Delete</a>'
      }]
    };

    $scope.detailGridOptions = function(dataItem) {
      return {
        dataSource: {
          data:  dataItem.contactPersons,
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
          },
        },
        columns: [{
          field: "contactPersonName",
          title: "title",
          width: "120px"
        },{
          title: "Edit",
          width: "120px",
          template: '<a  class="btn k-primary btn-outline btn-rounded btn-sm">Edit</a>'
        },{
          title: "Delete",
          width: "120px",
          template: '<a  class="btn k-primary btn-outline btn-rounded btn-sm">Delete</a>'
        }]
      };
    };


  });
