/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('UserprivilegeCtrl', function($scope, $state, SeatEatsConstants,fieldvalidationService,$rootScope,toastr,$localStorage) {

    $scope.$state = $state;
    $scope.model={};



    $scope.selectOptionsUserType = {
      filter: "contains",
      placeholder: "Select Type...",
      dataTextField: "name",
      dataValueField: "nodeLevel",
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
            url: SeatEatsConstants.AppUrlApi+"usersbylevel",
          beforeSend: function(req) {

            req.setRequestHeader('Authorization', $localStorage.currentUser.token);
          }
          }
        }
      }
    };



  });
