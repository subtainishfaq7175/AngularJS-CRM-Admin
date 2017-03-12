/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('DynamicfeildsCtrl', function($scope, $state,simpleObj,dynamicfeildsService,$mdDialog,$rootScope,$localStorage,toastr) {

    $scope.$state = $state;
    $scope.publishValidator=function () {
      $rootScope.scopeWorkingVariable = true;
      fieldvalidationService.updateValidation($scope.model).then(function (response) {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
        {
          $localStorage.currentUser.validation=response.data;
          toastr.success('Done','Operation Complete');

        }
        else
          toastr.error('Error','Operation Was not complete');
        debugger;
        console.log(response);

        $state.go("home");


      });

    };
    $scope.remove = function (scope) {
      scope.remove();
    };
    $scope.toggle = function (scope) {
      scope.toggle();
    };
    $scope.moveLastToTheBeginning = function () {
      var a = $scope.data.pop();
      $scope.data.splice(0, 0, a);
    };

    $scope.showPrompt = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('Title of the field')
        .textContent('Name of the form field.')
        .placeholder('Name')
        .ok('Okay!')
        .cancel('Cancle');

      $mdDialog.show(confirm).then(function(result) {

        var nodeData = ev.$modelValue;

        nodeData.nodes.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: result,
          isForm:false
        });

        $scope.status = 'You Added a Field In the Form ' + result + '.';
      }, function() {
        $scope.status = 'You didn\'t Added a Field In the Form.';
      });
    };

    $scope.newSubItem = function (scope) {
      $scope.showPrompt(scope);
    };
    $scope.collapseAll = function () {
      $scope.$broadcast('angular-ui-tree:collapse-all');
    };
    $scope.expandAll = function () {
      $scope.$broadcast('angular-ui-tree:expand-all');
    };
    debugger;
    $scope.data = simpleObj.data;
    $scope.publishFormSchema=function () {
      $rootScope.scopeWorkingVariable = true;

      dynamicfeildsService.updateValidation( $scope.data).then(function (response) {
        $rootScope.scopeWorkingVariable = false;

        if(response.status=200)
        {
          $scope.data=response.data;

            $localStorage.currentUser.forms=response.data;
          toastr.success('Done','Operation Complete');

        }
        else
          toastr.error('Error','Operation Was not complete');
        debugger;
        console.log(response);

        $state.go("home");

      })

    }


  });
