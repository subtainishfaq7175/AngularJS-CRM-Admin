/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('ProfilesCtrl', function($scope, $state, SeatEatsConstants,profilesService,$rootScope,toastr,$localStorage) {

    $scope.$state = $state;
    $scope.editProfile = function (ID) {
      console.log(ID);

      $state.go('profilesedit',{id:ID});
    };
    $scope.tree;

    homogeneous = new kendo.data.HierarchicalDataSource({
      transport: {
        read: {
          url: SeatEatsConstants.AppUrlApi + "/userstree",
          beforeSend: function(req) {

            req.setRequestHeader('Authorization', $localStorage.currentUser.token);
          },
          dataType: "json"
        }
      },
      schema: {
        model: {
          id: "_id",
          hasChildren: "treeNode.length>0",
          children:"treeNode"
        }
      }
    });
    $scope.treeOptions={

     dataSource: homogeneous,
     dataTextField: "name",
     dragAndDrop: true

   };


    $scope.deleteProfile = function (ID) {
      console.log(ID);
      $rootScope.scopeWorkingVariable = true;

      profilesService.deletsProfilesById(ID).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        $state.reload();

      });

      $state.go('profiles',{id:ID});
    };
    $scope.mainGridOptions={
      dataSource: {
        type: "json",
        transport: {
          read: {
            url: SeatEatsConstants.AppUrlApi + "/userschildren",
            beforeSend: function(req) {

              req.setRequestHeader('Authorization', $localStorage.currentUser.token);
            }
        }
        }/*,

        schema: {
          data: "docs",
          total: "total"
        }*/
        ,
        pageSize: 10,
        serverPaging: true,
        serverSorting: true
      },
      sortable: true,
      pageable: true,
      columns: [{
        field: "name",
        title: "User Name",
        width: "120px"
      },{
        field: "rank",
        title: "Ranks",
        width: "120px"
      },{
        title: "Edit",
        width: "120px",
        template: '<a ng-click="editProfile(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Edit</a>'
      }
      ,{
        title: "Delete",
        width: "120px",
        template: '<a ng-click="deleteProfile(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Delete</a>'
      }]
    };


  });
