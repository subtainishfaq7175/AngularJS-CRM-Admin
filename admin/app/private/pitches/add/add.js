/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('PitchesAddCtrl', function($scope, $state,SeatEatsConstants,pitchesService,$rootScope,toastr,$localStorage) {


    $scope.$state = $state;
    $scope.model={customFeilds:[]};

    $scope.validatorServer=$localStorage.currentUser.validation.pitchValidator;
    $scope.settings=$localStorage.currentUser.validation.settings;

    $scope.validator;
    $scope.country;
    $scope.isImageUploading = false;
    $scope.isImageUploadingScreen = false;
    $scope.isCountrySelected=false;
    $scope.formFields=$localStorage.currentUser.forms.nodes;
    if(angular.isDefined($scope.formFields[0].nodes))
      $scope.formFields=$scope.formFields[0].nodes[0];


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
    };
    $scope.selectOptionsPitchStatusType = {
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
    };
    $scope.selectOptionsPitchClientType = {
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
    };
    $scope.selectOptionsPitchClientResponseType = {
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
    };
    $scope.selectOptionslocation= {
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
    $scope.selectOptionsCities = {
      filter: "contains",
      placeholder: "City",

      valuePrimitive: true,
      autoBind: false,
      animation: {
        close: {
          effects: "zoom:out",
          duration: 500
        }
      },

      select :function (e) {
        console.log(e);
        console.log(e.sender.dataItem(e.item));
        $scope.model.city=e.sender.dataItem(e.item);
      }

    };

    $scope.source=new kendo.data.DataSource({
      data: $scope.selectedCities

    });


    $scope.publishPitch= publishPitch;



    function publishPitch() {




      if($scope.validator.validate())
      pitchesService.postPitch($scope.model).then(function (response) {
debugger;
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        debugger;
        console.log(response);

        $state.go("pitches");
      });

      else
        toastr.error('Error','Operation Was not complete');


    }


$scope.callback=function (obj) {
  if(angular.isDefined(obj))
  {
    $rootScope.scopeWorkingVariable = true;
    pitchesService.getCities().then(function (response) {
      debugger;
    $scope.selectedCities=response.data[obj.name];
    //console.log($scope.source);
      $scope.source.data($scope.selectedCities);

      $rootScope.scopeWorkingVariable = false;
      $scope.isCountrySelected=true;

  });


  }


}


  });
