/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('ContactPersonAddCtrl', function($scope, $state,SeatEatsConstants,masterdataService,$rootScope,toastr,$stateParams,contactpersonService,$localStorage) {

    $scope.$state = $state;
   // $scope.companyItem = $stateParams.id; use id to post the contact person in particular company , this id is of company
    $scope.model = {};
    $scope.userDoc = {};
    $scope.companyId=$stateParams.id;
    $scope.formFields=$localStorage.currentUser.forms.nodes;
    if(angular.isDefined($scope.formFields[0].nodes))
      $scope.formFields=$scope.formFields[0].nodes[1];

    $scope.validatorServer=$localStorage.currentUser.validation.companyValidator.contactPersons;
    $scope.settings=$localStorage.currentUser.validation.settings;

    $scope.publishCompany = publishCompany;
    $scope.autoCompleteOptions={
      dataTextField: "contactPersonName",
      filter: "contains",
      minLength: 3,
      dataSource: {
        type: "json",
        serverFiltering: true,
        transport: {
          read: SeatEatsConstants.AppUrlApi+'contactssearch/'+$stateParams.id
        },
        schema: {
          data: "contactPersons"
        }
      }
    }



   // if (angular.isDefined($scope.companyItem.contactPersons));//      $scope.companyItem.contactPersons.push($scope.model);
    //else {
     // $scope.companyItem.contactPersons = [];
    //}

    $scope.selectOptionsCompanyType = {
      filter: "contains",
      placeholder: "Select CompanyType...",
      dataTextField: "content",
      dataValueField: "content",
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
            url: SeatEatsConstants.AppUrlApi + "masterdata?type=contactType"
          }
        }
      }
    };
    function publishCompany() {
      if ($scope.validator.validate()) {


     //   $scope.companyItem.contactPersons.push($scope.model);

        $rootScope.scopeWorkingVariable = true;
        contactpersonService.addContactCompany($scope.model,$stateParams.id).then(function (response) {
          $rootScope.scopeWorkingVariable = false;
          if (response.status = 200)
            toastr.success('Done', 'Operation Complete');
          else
            toastr.error('Error', 'Operation Was not complete');

          $state.go('contactPerson', {id: $stateParams.id});
        })

      }


    else
    toastr.error('Error', 'Operation Was not complete');
  };

    $scope.callback = function () {
      console.log($scope.userDoc);
    };

  });
