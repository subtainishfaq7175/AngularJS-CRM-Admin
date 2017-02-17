/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('ContactPersonAddCtrl', function($scope, $state,SeatEatsConstants,masterdataService,$rootScope,toastr,$stateParams,companiesService) {

    $scope.$state = $state;
    $scope.companyItem=$stateParams.myParam;
    $scope.model={};
    if( angular.isDefined($scope.companyItem.contactPersons))
;//      $scope.companyItem.contactPersons.push($scope.model);
    else
    {
      $scope.companyItem.contactPersons=[];
    }

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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=contactType"
          }
        }
      }
    };

    $scope.publishCompany=publishCompany;



    function publishCompany() {
      $scope.companyItem.contactPersons.push($scope.model);

      $rootScope.scopeWorkingVariable = true;
      companiesService.putLetsplay($scope.companyItem).then(function (response) {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');

        $state.go('contactPerson',{myParam:$scope.companyItem});
      })

    }

  });
