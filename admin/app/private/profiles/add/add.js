/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('ProfilesAddCtrl', function($scope, $state,profilesService,$rootScope,toastr,AuthenticationService,$location,$localStorage,SeatEatsConstants) {


    var vm = $scope;

    vm.login = login;
    vm.credentials=
      {
        name : undefined,
        password:undefined
      };


    initController();

    function initController() {
      // reset login status
      AuthenticationService.Logout();
    };

    $scope.selectOptionsTeamType = {
      filter: "contains",
      placeholder: "Select Type...",
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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=team"
          }
        }
      }
    };



    function login() {
      vm.loading = true;
      AuthenticationService.SignUp(vm.credentials.name, vm.credentials.password, function (result)
      {
        debugger;
        if (result === true) {
          $location.path('/dashboard');
        } else {
          vm.error = 'Username or password is incorrect';
          vm.loading = false;
        }
      },vm.credentials.team);
    };




  });
