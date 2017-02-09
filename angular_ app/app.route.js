/**
 * Created by subtainishfaq on 2/10/17.
 */

angular.module("appRoute",[]).config(
    function($stateProvider) {
        $stateProvider.state('employeeAdd', {
            url: 'employee/add',
            templateUrl: "employee/add/add.tpl.html",
            controller: "AddController"

        });
        $stateProvider.state('employeeHome', {
            url: 'employee/',
            templateUrl: "employee/employeeHome/employeeHome.tpl.html",
            controller: "HomeController",

            resolve: {
                data: ['$http', function($http) {
                    return  $http.get(config.serverUrl + config.read);
                }]
            }
        });

        $stateProvider.state('employeeEdit', {
            url: 'employee/edit/:_id',
            templateUrl: "employee/add/add.tpl.html",
            controller: "EditController"

        });

        $stateProvider.state('deleteEmployee', {
            url: 'employee/delete/:_id',
            templateUrl: "employee/delete/delete.tpl.html",
            controller: "DeleteController"

        });

    }


    )
;