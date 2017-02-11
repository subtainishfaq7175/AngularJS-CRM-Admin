angular.module("app").controller("EditController", function($scope, AddService, $state,$stateParams,$rootScope) {
    $scope.employee = AddService.getById($rootScope.record, $stateParams._id);

    $scope.editMode=true;

    $scope.updateEmployee = function(employee) {
        console.log('inside edit controller');
        console.log(employee);
        AddService.updateEmployee(employee).then(function(resolve){
           //$scope.record.push(employee);
             $state.go('employeeHome');
        }, function(reject){
            $state.go('employeeHome');
        });
       
        
    }
});





