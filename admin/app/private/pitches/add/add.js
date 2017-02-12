/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('PitchesAddCtrl', function($scope, $state,SeatEatsConstants,gamesService,$rootScope,toastr) {


    $scope.$state = $state;
    $scope.model={};
    $scope.model.tags=[];
    $scope.model.genre=[];
    $scope.model.languages=[];
    $scope.model.pitchType=[];
    $scope.model.location=[];
    $scope.model.screen_images=[];
    $scope.isImageUploading = false;
    $scope.isImageUploadingScreen = false;

    $scope.selectOptionsPitchType = {
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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=pitchType"
          }
        }
      }
    };
    $scope.selectOptionsContactType = {
      filter: "contains",
      placeholder: "Select ContactType...",
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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=contactType"
          }
        }
      }
    }; $scope.selectOptionsCompanyType = {
      filter: "contains",
      placeholder: "Select CompanyType...",
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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=companyType"
          }
        }
      }
    };

    $scope.selectOptionsRequestedServiceType = {
      filter: "contains",
      placeholder: "Select Requested Service Type...",
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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=requestedServiceType"
          }
        }
      }
    };  $scope.selectOptionsPitchStatusType = {
      filter: "contains",
      placeholder: "Select Pitch StatusType...",
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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=pitchStatusType"
          }
        }
      }
    };  $scope.selectOptionsPitchClientType = {
      filter: "contains",
      placeholder: "Select Pitch Client Type...",
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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=pitchClientType"
          }
        }
      }
    };  $scope.selectOptionsPitchClientResponseType = {
      filter: "contains",
      placeholder: "Select Client Response Type...",
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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=pitchClientResponseType"
          }
        }
      }
    };
  $scope.selectOptionsPitchClientCurrentServiceType = {
      filter: "contains",
      placeholder: "Select Client Current Service Type...",
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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=pitchClientCurrentServiceType"
          }
        }
      }
    };
  $scope.selectOptionsPitchSourceType = {
      filter: "contains",
      placeholder: "Select Source Type...",
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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=pitchSourceType"
          }
        }
      }
    };  $scope.selectOptionslocation= {
      filter: "contains",
      placeholder: "Select Locations...",
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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=location"
          }
        }
      }
    };
  $scope.selectOptionsPitchCurrencyType = {
      filter: "contains",
      placeholder: "Select Currency Type...",
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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=pitchCurrencyType"
          }
        }
      }
    };

    $scope.selectOptionsGenre = {
      filter: "contains",
      placeholder: "Select tags...",
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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=genre"
          }
        }
      }
    };
    $scope.selectOptionsCategories = {
      filter: "contains",
      placeholder: "Select tags...",
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
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=categories"
          }
        }
      }
    };
    $scope.companyType = [];
    $scope.location = [];
    $scope.pitchType = [];
    $scope.requestedServiceType = [];
    $scope.selectedLanguage = [];
    $scope.contactType = [];
    $scope.pitchCurrencyType = [];
    $scope.pitchSourceType = [];
    $scope.pitchStatusType = [];
    $scope.pitchClientResponseType = [];
    $scope.pitchClientType = [];
    $scope.pitchClientCurrentServiceType = [];
    $scope.mainUploadOptions={
      async: {
        saveUrl: SeatEatsConstants.AppUrlApi+"letsplayimage",
        removeUrl: "http://my-app.localhost/remove",
        removeVerb: "DELETE"
      },
      validation: {
        allowedExtensions: [".jpg",".png"]
      },
      multiple: false,
      showFileList: true,
      complete: onComplete,
      success: onSuccess,
      select: onSelect,
      cancel: onCancel,
      remove: onRemove




    };
    $scope.mainUploadOptionsScreen={
      async: {
        saveUrl: SeatEatsConstants.AppUrlApi+"letsplayimage",
        removeUrl: "http://my-app.localhost/remove",
        removeVerb: "DELETE"
      },
      validation: {
        allowedExtensions: [".jpg",".png"]
      },
      multiple: true,
      showFileList: true,
      complete: onCompleteScreen,
      success: onSuccessScreen,
      select: onSelectScreen,
      cancel: onCancelScreen,
      remove: onRemoveScreen




    };
    $scope.publishGames= publishGames;

    function publishGames() {



      for(var i=0;i<$scope.selectedTags.length;i++)
      {
        $scope.model.tags.push({title: $scope.selectedTags[i]});
      }
      for(var i=0;i<$scope.selectedGenre.length;i++)
      {
        $scope.model.genre.push({title: $scope.selectedGenre[i]});
      }
      for(var i=0;i<$scope.selectedLanguage.length;i++)
      {
        $scope.model.languages.push({title: $scope.selectedLanguage[i]});
      }
      for(var i=0;i<$scope.selectedCategories.length;i++)
      {
        $scope.model.categories.push({title: $scope.selectedCategories[i]});
      }

   //if(!$scope.isImageUploading && !$scope.isImageUploadingScreen)
      gamesService.postGame($scope.model).then(function (response) {

        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        debugger;
        console.log(response);

        $state.go("games");
      })

    }
    function onCancel(e) {
      // Array with information about the uploaded files
      var files = e.files;
      console.log(e);
      $scope.isImageUploading=false;

      // Process the Cancel event
    }
    function onComplete(e) {
      // The upload is now idle
      console.log(e);
      $scope.isImageUploading=false;

    }
    function onSuccess(e) {
      // Array with information about the uploaded files
      $scope.isImageUploading=true;
      $scope.model.image_url= e.response.url;

    }
    function onSelect(e) {

      $scope.isImageUploading=true;
    };
    function onRemove(e) {
      // Array with information about the removed files
      $scope.isImageUploading=false;
      // Process the Remove event
      // Optionally cancel the remove operation by calling
      // e.preventDefault()
    };
    function onCancelScreen(e) {
      // Array with information about the uploaded files
      var files = e.files;
      console.log(e);
      $scope.isImageUploadingScreen=false;

      // Process the Cancel event
    }
    function onCompleteScreen(e) {
      // The upload is now idle
      console.log(e);
      $scope.isImageUploadingScreen=false;

    }
    function onSuccessScreen(e) {
      // Array with information about the uploaded files

      $scope.model.screen_images.push({image_url: e.response.url});
      $scope.isImageUploadingScreen=false



    }
    function onSelectScreen(e) {

      $scope.isImageUploadingScreen=true;
    };
    function onRemoveScreen(e) {
      // Array with information about the removed files
      $scope.isImageUploadingScreen=false;
      // Process the Remove event
      // Optionally cancel the remove operation by calling
      // e.preventDefault()
    }



  });
