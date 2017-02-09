angular.module("app")
    .controller("HomeController", function(data,$scope,$rootScope) {
    
    $rootScope.record=data.data.data;
});
