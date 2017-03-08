'use strict';


angular
  .module('yapp', [
    'ui.router',
    'ngAnimate',
    'kendo.directives',
    'ngMaterial',
    'ngStorage',
    'ngSanitize',
    'angular-sortable-view',
    'ngLoader',
    'toastr',
    'ngCountries',
    'gg.editableText'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/home');
    $urlRouterProvider.otherwise('/login');
    //  delete $httpProvider.defaults.headers.common["X-Requested-With"];




    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'private/views/base.html'
      })
      .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'public/login/login.html',
          controller: 'LoginCtrl'
        })
      .state('signup', {
          url: '/signup',
          parent: 'base',
          templateUrl: 'public/signup/signup.html',
          controller: 'SignupCtrl'
        })
      .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: 'private/dashboard/dashboard.html',
          controller: 'DashboardCtrl'
        })
      .state('home', {
            url: '/home',
            parent: 'dashboard',
            controller: 'HomeCtrl',
            templateUrl: 'private/home/home.html'
          })
      .state('masterdata', {
        resolve:{

          link:  function(masterdataService)
          {
            //get game here


            return masterdataService.getMasterdataByType("link");
          },
          pitchType:  function(masterdataService)
          {
            //get game here


            return masterdataService.getMasterdataByType("pitchType");
          },
          location:  function(masterdataService)
          {
            //get game here


            return masterdataService.getMasterdataByType("location");
          },
          language:  function(masterdataService)
          {
            //get game here


            return masterdataService.getMasterdataByType("language");
          },
          contactType:  function(masterdataService)
          {
            //get game here


            return masterdataService.getMasterdataByType("contactType");
          },
          companyType:  function(masterdataService)
          {
            //get game here


            return masterdataService.getMasterdataByType("companyType");
          },
          requestedServiceType:  function(masterdataService)
          {
            //get game here


            return masterdataService.getMasterdataByType("requestedServiceType");
          }
          ,pitchStatusType:  function(masterdataService)
          {
            //get game here


            return masterdataService.getMasterdataByType("pitchStatusType");
          },pitchClientResponseType:  function(masterdataService)
          {
            //get game here


            return masterdataService.getMasterdataByType("pitchClientResponseType");
          },pitchClientCurrentServiceType:  function(masterdataService)
          {
            //get game here


            return masterdataService.getMasterdataByType("pitchClientCurrentServiceType");
          },pitchClientType:  function(masterdataService)
          {
            //get game here


            return masterdataService.getMasterdataByType("pitchClientType");
          },pitchCurrencyType:  function(masterdataService)
          {
            //get game here


            return masterdataService.getMasterdataByType("pitchCurrencyType");
          },pitchSourceType:  function(masterdataService)
          {
            //get game here


            return masterdataService.getMasterdataByType("pitchSourceType");
          }},

        url: '/masterdata',
            parent: 'dashboard',
            controller: 'MasterdataCtrl',
            templateUrl: 'private/masterdata/masterdata.html'
          })
      .state('pitches', {
            url: '/pitches',
            parent: 'dashboard',
            controller: 'PitchesCtrl',
            templateUrl: 'private/pitches/pitches.html'
          })
      .state('pitchesadd', {
            url: '/pitchesadd',
            parent: 'dashboard',
            controller: 'PitchesAddCtrl',
            templateUrl: 'private/pitches/add/add.html'
          })
      .state('pitchesedit', {
            url: '/pitchesedit/:id',
            parent: 'dashboard',
            controller: 'PitchesEditCtrl',
            templateUrl: 'private/pitches/edit/edit.html',
        resolve:{

          simpleObj:  function(pitchesService,$stateParams)
          {
            //get game here


            return pitchesService.getPitchById($stateParams.id);
          }}
          })
      .state('companies', {
            url: '/companies',
            parent: 'dashboard',
            controller: 'CompaniesCtrl',
            templateUrl: 'private/companies/companies.html'
          })
      .state('companiesadd', {
        url: '/companiesadd',
        parent: 'dashboard',
        controller: 'CompaniesAddCtrl',
        templateUrl: 'private/companies/add/add.html'
      })
      .state('companiesedit', {

        resolve:{

          itemCompanies:  function(companiesService,$stateParams)
          {
            //get game here


            return companiesService.getLetsplayById($stateParams.id);
          }},
        url: '/companiesedit/:id',
        parent: 'dashboard',
        controller: 'CompaniesEditCtrl',
        templateUrl: 'private/companies/edit/edit.html'
      })
      .state('contactPerson', {
            url: '/contactPerson',
            parent: 'dashboard',
            controller: 'ContactPersonCtrl',
            templateUrl: 'private/contactPerson/contactPerson.html',
            params: {myParam: null}
          })
      .state('contactPersonadd', {
        url: '/contactPersonadd',
        parent: 'dashboard',
        controller: 'ContactPersonAddCtrl',
        templateUrl: 'private/contactPerson/add/add.html',
        params: {myParam: null}

      })
      .state('contactPersonedit', {
        url: '/contactPersonedit',
        parent: 'dashboard',
        controller: 'ContactPersonEditCtrl',
        templateUrl: 'private/contactPerson/edit/edit.html',
        params: {myParam: null}
      })
      .state('profiles', {
        url: '/profiles',
        parent: 'dashboard',
        controller: 'ProfilesCtrl',
        templateUrl: 'private/profiles/profiles.html'
      })
      .state('profilesadd', {
        url: '/profilesadd',
        parent: 'dashboard',
        controller: 'ProfilesAddCtrl',
        templateUrl: 'private/profiles/add/add.html'
      })
      .state('profilesedit', {

      resolve:{

        simpleObj:  function(profilesService,$stateParams)
        {
          //get game here


          return profilesService.getProfileById($stateParams.id);
        }},

        url: '/profilesedit/:id',
        parent: 'dashboard',
        controller: 'ProfilesEditCtrl',
        templateUrl: 'private/profiles/edit/edit.html'
      })
      .state('fieldvalidation', {
        url: '/fieldvalidation',
        parent: 'dashboard',
        controller: 'FieldvalidationCtrl',
        templateUrl: 'private/fieldvalidation/fieldvalidation.html'
      })
      .state('userprivilege', {
        url: '/userprivilege',
        parent: 'dashboard',
        controller: 'UserprivilegeCtrl',
        templateUrl: 'private/userprivilege/userprivilege.html'
      })
      .state('settings', {


        url: '/settings',
        parent: 'dashboard',
        templateUrl: 'private/settings/settings.html'
      });

  })
  .run(run);

function run($rootScope, $http, $state, $localStorage) {
  // keep user logged in after page refresh
  if ($localStorage.currentUser) {
    $http.defaults.headers.common.Authorization = $localStorage.currentUser.token;
  }

  // redirect to login page if not logged in and trying to access a restricted page

  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options)
    {
      $rootScope.scopeMessageVariable="Loading";
      $rootScope.scopeWorkingVariable=true;


      var publicPages = ['login','signup'];
      var restrictedPage = publicPages.indexOf(toState.name) === -1;
      if (restrictedPage && !$localStorage.currentUser) {
        $state.go('login');
      }


    });



  $rootScope.$on('$stateChangeSuccess',function(){
    $rootScope.scopeWorkingVariable=false;

  });

}
