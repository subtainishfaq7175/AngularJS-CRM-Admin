angular.module("app").
    controller("AddController", function($scope, AddService, $state) {
    $scope.employee = {};
    $scope.editMode=false;
    $scope.addEmployee = function(employee) {
        AddService.saveEmployee(employee).then(function(resolve){
           
           // $scope.record.push(employee);
             $state.go('employeeHome');
        }, function(reject){
             $state.go('employeeHome');
           
        });
        
    }

    
});




