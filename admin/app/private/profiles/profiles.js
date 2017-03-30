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
    $scope.assignProfile = function (ID) {
      console.log(ID);
      $rootScope.scopeWorkingVariable = true;

      profilesService.approveParent(ID).then(function (response)
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

    $scope.treeViewSale;
    $scope.parentIdSale;
    homogeneousSale = new kendo.data.HierarchicalDataSource({
      transport: {
        read: {
          url: SeatEatsConstants.AppUrlApi + "userstree/sale",
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
    $scope.treeOptionsSale={

     dataSource: homogeneousSale,
     dataTextField: "name",
     dragAndDrop: true,
     dragstart :function (e) {
       var parent = e.sender.dataItem( $scope.treeView.parent(e.sourceNode));
       if(angular.isDefined(parent))
       $scope.parentId = parent._id;
       else
         $scope.parentId="404";
       console.log(parent);

     },
     dragend: function(e) {

       var parent = e.sender.dataItem( $scope.treeView.parent(e.sourceNode));
      if(angular.isDefined(parent) && $scope.parentId !== parent._id) {
        var sourceNode = e.sender.dataItem(e.sourceNode);
        var destNode = parent; // Change source path and parent
        sourceNode.parentId = destNode._id;
        sourceNode.path = destNode.path + "#" + sourceNode._id;
        $rootScope.scopeWorkingVariable = true;

        profilesService.updateProfile(sourceNode).then(function (response) {

          $rootScope.scopeWorkingVariable = false;

        });
      }

        else if( !angular.isDefined(parent) && $scope.parentId!=="404")
      {


        var sourceNode= e.sender.dataItem(e.sourceNode);
        sourceNode.path=sourceNode._id;
        sourceNode.parentId=undefined;
        $rootScope.scopeWorkingVariable = true;

        profilesService.updateProfile(sourceNode).then(function (response) {

          $rootScope.scopeWorkingVariable = false;
          console.log(response)

        });
      }

      }

      }

    $scope.treeViewTeleSale;
    $scope.parentIdTeleSale;
    homogeneousTeleSale = new kendo.data.HierarchicalDataSource({
      transport: {
        read: {
          url: SeatEatsConstants.AppUrlApi + "userstree/telesale",
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
    $scope.treeOptionsTeleSale={

     dataSource: homogeneousTeleSale,
     dataTextField: "name",
     dragAndDrop: true,
     dragstart :function (e) {
       var parent = e.sender.dataItem( $scope.treeView.parent(e.sourceNode));
       if(angular.isDefined(parent))
       $scope.parentId = parent._id;
       else
         $scope.parentId="404";
       console.log(parent);

     },
     dragend: function(e) {

       var parent = e.sender.dataItem( $scope.treeView.parent(e.sourceNode));
      if(angular.isDefined(parent) && $scope.parentId !== parent._id) {
        var sourceNode = e.sender.dataItem(e.sourceNode);
        var destNode = parent; // Change source path and parent
        sourceNode.parentId = destNode._id;
        sourceNode.path = destNode.path + "#" + sourceNode._id;
        $rootScope.scopeWorkingVariable = true;

        profilesService.updateProfile(sourceNode).then(function (response) {

          $rootScope.scopeWorkingVariable = false;

        });
      }

        else if( !angular.isDefined(parent) && $scope.parentId!=="404")
      {


        var sourceNode= e.sender.dataItem(e.sourceNode);
        sourceNode.path=sourceNode._id;
        sourceNode.parentId=undefined;
        $rootScope.scopeWorkingVariable = true;

        profilesService.updateProfile(sourceNode).then(function (response) {

          $rootScope.scopeWorkingVariable = false;
          console.log(response)

        });
      }

      }

      }
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
    $scope.unAssignedGridOptions={
      dataSource: {
        type: "json",
        transport: {
          read: {
            url: SeatEatsConstants.AppUrlApi + "/usersunassigned",
            beforeSend: function(req) {

              req.setRequestHeader('Authorization', $localStorage.currentUser.token);
            }
        }
        }
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
        field: "isAssingned",
        title: "Assigned",
        width: "120px"
      },{
        title: "Operation",
        width: "120px",
        template: '<a ng-click="assignProfile(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Approve Parent</a>'
      }
      ,{
        title: "Delete",
        width: "120px",
        template: '<a ng-click="deleteProfile(dataItem._id)" class="btn k-primary btn-outline btn-rounded btn-sm">Delete</a>'
      }]
    };


  });
