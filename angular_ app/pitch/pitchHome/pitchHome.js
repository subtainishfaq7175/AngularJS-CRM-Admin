angular.module("app")
    .controller("PitchHomeController", function(data,$scope,$rootScope) {
    debugger;
    $rootScope.record=data.data.data;
});
