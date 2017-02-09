angular.module("app").controller("DeleteController", function($scope, AddService, $state,$stateParams,$rootScope) {

    $scope.employee = AddService.getById($rootScope.record, $stateParams._id);
    $scope.editMode=false;

    $scope.deleteEmployee = function(employee) {
        AddService.deleteEmployee(employee).then(function(resolve){
           //$scope.record.push(employee);
             $state.go('employeeHome');
        }, function(reject){
            $state.go('employeeHome');
        });
        
        
    }
});