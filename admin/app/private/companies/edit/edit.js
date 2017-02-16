/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('CompaniesEditCtrl', function($scope, $state,itemCompanies,$sce,companiesService) {
    console.log(itemCompanies);

    $scope.$state = $state;
    $scope.itemCompanies = itemCompanies.data;
    $scope.content = $sce.trustAsHtml($scope.itemCompanies.content);
    if(!angular.isDefined($scope.itemCompanies.episodes))
      $scope.itemCompanies["episodes"]=[];

$scope.UpldateLetsPlay=UpldateLetsPlay;

    function UpldateLetsPlay()
    {
      debugger;
      companiesService.putLetsplay($scope.itemCompanies).then(function (response)
      {

        debugger;
        console.log(response);
        $state.go("companies");

      })

    }

  });
