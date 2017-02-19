/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('ContactPersonEditCtrl', function($scope, $state,$sce,companiesService,$rootScope,SeatEatsConstants,toastr,$stateParams,$localStorage) {

    $scope.$state = $state;
    $scope.companyItem=$stateParams.myParam;

    $scope.model =  $scope.companyItem.contactPersons[$scope.companyItem.editIndex];
    $scope.validatorServer=$localStorage.currentUser.validation.companyValidator.contactPersons;


    $scope.selectOptionsCompanyType = {
      filter: "contains",
      placeholder: "Select contactType...",
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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=contactType"
          }
        }
      }
    };


    $scope.validator;


    $scope.publishCompany=publishCompany;

    function publishCompany()
    {
      if ($scope.validator.validate()) {

        $rootScope.scopeWorkingVariable = true;

        companiesService.putLetsplay($scope.companyItem).then(function (response) {
          console.log(response);
          $rootScope.scopeWorkingVariable = false;
          if (response.status = 200)
            toastr.success('Done', 'Operation Complete');
          else
            toastr.error('Error', 'Operation Was not complete');

          $state.go('contactPerson', {myParam: $scope.companyItem});

        });

      }
      else
        toastr.error('Error', 'Operation Was not complete');

    }

  });
