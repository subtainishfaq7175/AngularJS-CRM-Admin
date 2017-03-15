/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('CompaniesAddCtrl', function($scope, $state,SeatEatsConstants,masterdataService,companiesService,$rootScope,toastr,$localStorage) {

    $scope.$state = $state;
    $scope.model={};
    $scope.formFields=$localStorage.currentUser.forms.nodes;
    if(angular.isDefined($scope.formFields[0].nodes))
      $scope.formFields=$scope.formFields[0].nodes[2];

    $scope.autoCompleteOptions={
      dataTextField: "companyName",
      filter: "contains",
      minLength: 3,
      dataSource: {
        type: "json",
        serverFiltering: true,
        transport: {
          read: SeatEatsConstants.AppUrlApi+'companyssearch'
        },
        schema: {
          data: "docs"
        }
      }




    };

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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=companyType"
          }
        }
      }
    };
    $scope.validatorServer=$localStorage.currentUser.validation.companyValidator;
    $scope.settings=$localStorage.currentUser.validation.settings;


    $scope.publishCompany=publishCompany;
    $scope.validator;



    function publishCompany() {
      if ($scope.validator.validate()) {
        $rootScope.scopeWorkingVariable = true;

        companiesService.postLetsplay($scope.model).then(function (response) {
          $rootScope.scopeWorkingVariable = false;
          if (response.status = 200)
            toastr.success('Done', 'Operation Complete');
          else
            toastr.error('Error', 'Operation Was not complete');

          $state.go("companies");
        })

      }

      else
        toastr.error('Error', 'Operation Was not complete');

    }
  });
