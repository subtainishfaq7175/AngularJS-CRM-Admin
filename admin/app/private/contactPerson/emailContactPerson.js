/**
 * Created by subtainishfaq on 3/20/17.
 */
/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('EmailContactPersonCtrl', function($scope, $state,SeatEatsConstants,contactpersonService,toastr,$rootScope,$stateParams,simpleObj) {

    $scope.$state = $state;
    $scope.model={};
    $scope.model.email=simpleObj.data.contactPersonEmail;
    $scope.sendEmail=function ()
    {  $rootScope.scopeWorkingVariable = true;


contactpersonService.sendEmailToServer($scope.model).then(function (response) {

  $rootScope.scopeWorkingVariable = false;
  if (response.status = 200 && response.data.status)
    toastr.success('Done', 'Email Sent');
  else
    toastr.error('Error', 'Operation Was not complete');

  $state.go('contactPerson', {id: $stateParams.idcompany});
  // check the state history to go to previous company state


  })
    };


    // finally use grid to get companies , within companies get contact person
    // $scope.conversionToLead = function (id) {
    //   $state.go('pitchesadd',{idcompany:simpleObj.data._id,idcontact:id});
    //   console.log(id);
    // };
    // $scope.editLetsplay = function (ID) {
    //   $state.go('contactPersonedit',{idcompany:simpleObj.data._id,idcontact:ID});
    //
    // };
    // $scope.goToContactPersonadd=function() {
    //   $state.go('contactPersonadd',{id:$stateParams.id});
    //
    // };
    // $scope.deleteLetsplay = function (ID) {
    //
    //
    //
    //   contactpersonService.deleteContact($scope.companyItem._id,ID).then(function (response) {
    //     $rootScope.scopeWorkingVariable = false;
    //     if(response.status=200)
    //       toastr.success('Done','Operation Complete');
    //     else
    //       toastr.error('Error','Operation Was not complete');
    //
    //     $state.reload();
    //   })
    // };
    // $scope.sendEmail=function (ID)
    // {
    //
    // };
    // $scope.mainGridOptions={
    //   dataSource: {
    //     data:  $scope.companyItem.contactPersons,
    //     schema: {
    //       model: {
    //         fields: {
    //           contactPersonName:{type : "string"},
    //           contactPersonDesignation:{type : "string"},
    //           contactPersonContactNumber:{type : "string"},
    //           contactPersonEmail:{type : "string"},
    //           contactPersonContactType:{type : "string"},
    //           contactPersonIsDecisionMaker:{type : "boolean"},
    //           contactPersonIsClientNew:{type : "boolean"},
    //           contactPersonRemarks: {type : "string"}
    //         }
    //       }
    //     }
    //   },
    //
    //   filterable: {
    //     mode: "row"
    //   },
    //   columns: [{
    //     field: "contactPersonName",
    //     title: "title",
    //     filterable: {
    //       cell: {
    //         showOperators: false,
    //         operator: "contains"
    //
    //       }
    //     },
    //     width: "120px"
    //   },{
    //     title: "Edit",
    //     width: "120px",
    //     template: '<a ng-click="editLetsplay(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Edit</a>'
    //   },{
    //     title: "Operation",
    //     width: "120px",
    //     template: '<div ng-if="dataItem.isCoverted"> <md-icon class="material-icons md-warn" >check_circle</md-icon> Converted </div><a ng-click="conversionToLead(dataItem._id)" ng-if="!dataItem.isCoverted"  class="btn k-primary btn-outline btn-rounded btn-sm">Covert to Lead</a>'
    //   },{
    //     title: "Contact",
    //     width: "120px",
    //     template: ' <a ng-click="sendEmail(dataItem._id)"  class="btn k-primary btn-outline btn-rounded btn-sm">Send Email</a>'
    //   },{
    //     title: "Delete",
    //     width: "120px",
    //     template: '<a ng-click="deleteLetsplay(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Delete</a>'
    //   }],
    //   dataBound: function(e)  {
    //     var items = e.sender.items();
    //     console.log("conversionColorClass");
    //     items.each(function (index) {
    //       var dataItem = $scope.companyItem.contactPersons[index];
    //       if (dataItem.isCoverted) {
    //         this.className += " alert-success";
    //       }
    //     })
    //   }
    // };
    //


  });
