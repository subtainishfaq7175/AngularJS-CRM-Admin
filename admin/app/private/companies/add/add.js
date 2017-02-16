/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('CompaniesAddCtrl', function($scope, $state,SeatEatsConstants,masterdataService,companiesService,$rootScope,toastr) {

    $scope.$state = $state;
    $scope.model={};
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

    $scope.publishCompany=publishCompany;



    function publishCompany() {


      companiesService.postLetsplay($scope.model).then(function (response) {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');

        $state.go("companies");
      })

    }

  });
