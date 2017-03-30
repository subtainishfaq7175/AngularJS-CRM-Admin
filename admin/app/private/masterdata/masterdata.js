/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('MasterdataCtrl', function($scope, $state,masterdataService,link,pitchType,location,team,language,contactType,companyType,requestedServiceType,pitchStatusType,pitchClientResponseType,pitchClientCurrentServiceType,pitchClientType,pitchSourceType,pitchCurrencyType,$rootScope,toastr)
  {

    $scope.$state = $state;
    $scope.model={};
    if(angular.isDefined(pitchType))
    $scope.model.pitchType=pitchType.data;
    else
      $scope.model.pitchType={};
    if(angular.isDefined(location))
    $scope.model.location=location.data;
    else
      $scope.model.location={};

    if(angular.isDefined(team))
    $scope.model.team=team.data;
    else
      $scope.model.team={};

    if(angular.isDefined(language))
    $scope.model.language=language.data;
    else
      $scope.model.language={};
    if(angular.isDefined(contactType))
    $scope.model.contactType=contactType.data;
    else
      $scope.model.contactType={};

    if(angular.isDefined(companyType))
    $scope.model.companyType=companyType.data;
    else
      $scope.model.companyType={};

 if(angular.isDefined(requestedServiceType))
    $scope.model.requestedServiceType=requestedServiceType.data;
    else
      $scope.model.requestedServiceType={};

 if(angular.isDefined(pitchStatusType))
    $scope.model.pitchStatusType=pitchStatusType.data;
    else
      $scope.model.pitchStatusType={};
 if(angular.isDefined(pitchClientResponseType))
    $scope.model.pitchClientResponseType=pitchClientResponseType.data;
    else
      $scope.model.pitchClientResponseType={};
 if(angular.isDefined(pitchClientCurrentServiceType))
    $scope.model.pitchClientCurrentServiceType=pitchClientCurrentServiceType.data;
    else
      $scope.model.pitchClientCurrentServiceType={};
 if(angular.isDefined(pitchClientType))
    $scope.model.pitchClientType=pitchClientType.data;
    else
      $scope.model.pitchClientType={};
 if(angular.isDefined(pitchCurrencyType))
    $scope.model.pitchCurrencyType=pitchCurrencyType.data;
    else
      $scope.model.pitchCurrencyType={};
 if(angular.isDefined(pitchSourceType))
    $scope.model.pitchSourceType=pitchSourceType.data;
    else
      $scope.model.pitchSourceType={};

    $scope.model.youtube={    title: undefined,     content:undefined,     secondary:undefined,     content_type:undefined };
    $scope.model.dailymotion={    title: undefined,     content:undefined,     secondary:undefined,     content_type:undefined };
    $scope.model.vimeo={    title: undefined,     content:undefined,     secondary:undefined,     content_type:undefined };
    $scope.model.clipfish={    title: undefined,     content:undefined,     secondary:undefined,     content_type:undefined };
    $scope.model.myvideo={    title: undefined,     content:undefined,     secondary:undefined,     content_type:undefined };
    $scope.model.twitch={    title: undefined,     content:undefined,     secondary:undefined,     content_type:undefined };
    $scope.model.sevenload={    title: undefined,     content:undefined,     secondary:undefined,     content_type:undefined };
    link=link.data;
    if(angular.isDefined(link))
    {
     for (var i=0;i<link.length ;i++)
     {

       switch (link[i].title)
       {
         case "youtube":
           $scope.model.youtube=link[i];
           break;
         case "vimeo":
           $scope.model.vimeo=link[i];
           break;

         case "dailymotion":
           $scope.model.dailymotion=link[i];

           break;
         case "myvideo":
           $scope.model.myvideo=link[i];
           break;
         case "clipfish":
           $scope.model.clipfish=link[i];
           break;

         case "twitch":
           $scope.model.twitch=link[i];
           break;

         case "sevenload":
           $scope.model.sevenload=link[i];
           break;

       }
     }
    }


    $scope.saveLink=saveLink;
    $scope.savePitchType=savePitchType;
    $scope.removePitchType=removePitchType;
    $scope.saveLocation=saveLocation;
    $scope.saveTeam=saveTeam;
    $scope.removeLocation=removeLocation;
    $scope.removeTeam=removePitchType;
    $scope.removeLanguage=removePitchType;
    $scope.saveLanguage=saveLanguage;
    $scope.removeContactType=removePitchType;
    $scope.saveContactType=saveContactType;
    $scope.removeCompanyType=removePitchType;
    $scope.removeRequestedServiceType=removePitchType;
    $scope.removePitchStatusType=removePitchType;
    $scope.removePitchClientResponseType=removePitchType;
    $scope.removePitchClientCurrentServiceType=removePitchType;
    $scope.removePitchClientType=removePitchType;
    $scope.removePitchSourceType=removePitchType;
    $scope.removePitchCurrencyType=removePitchType;
    $scope.saveCompanyType=saveCompanyType;
    $scope.saveRequestedServiceType=saveRequestedServiceType;
    $scope.savePitchStatusType=savePitchStatusType;
    $scope.savePitchClientResponseType=savePitchClientResponseType;
    $scope.savePitchClientCurrentServiceType=savePitchClientCurrentServiceType;
    $scope.savePitchClientType=savePitchClientType;
    $scope.savePitchSourceType=savePitchSourceType;
    $scope.savePitchCurrencyType=savePitchCurrencyType;

    function saveLanguage(index) {
      index.content_type="language";
      $rootScope.scopeWorkingVariable = true;

      masterdataService.postObj(index).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        index._id=response.data._id;
        console.log(response);
      });
    }
    function saveContactType(index) {
      index.content_type="contactType";
      $rootScope.scopeWorkingVariable = true;

      masterdataService.postObj(index).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        index._id=response.data._id;
        console.log(response);
      });
    }
    function saveCompanyType(index) {
      index.content_type="companyType";
      $rootScope.scopeWorkingVariable = true;

      masterdataService.postObj(index).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        index._id=response.data._id;
        console.log(response);
      });
    }
    function saveRequestedServiceType(index) {
      index.content_type="requestedServiceType";
      $rootScope.scopeWorkingVariable = true;

      masterdataService.postObj(index).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        index._id=response.data._id;
        console.log(response);
      });
    }
    function savePitchStatusType(index) {
      index.content_type="pitchStatusType";
      $rootScope.scopeWorkingVariable = true;

      masterdataService.postObj(index).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        index._id=response.data._id;
        console.log(response);
      });
    }
    function savePitchClientResponseType(index) {
      index.content_type="pitchClientResponseType";
      $rootScope.scopeWorkingVariable = true;

      masterdataService.postObj(index).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        index._id=response.data._id;
        console.log(response);
      });
    }
    function savePitchClientCurrentServiceType(index) {
      index.content_type="pitchClientCurrentServiceType";
      $rootScope.scopeWorkingVariable = true;

      masterdataService.postObj(index).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        index._id=response.data._id;
        console.log(response);
      });
    }
    function savePitchClientType(index) {
      index.content_type="pitchClientType";
      $rootScope.scopeWorkingVariable = true;

      masterdataService.postObj(index).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        index._id=response.data._id;
        console.log(response);
      });
    }
    function savePitchCurrencyType(index) {
      index.content_type="pitchCurrencyType";
      $rootScope.scopeWorkingVariable = true;

      masterdataService.postObj(index).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        index._id=response.data._id;
        console.log(response);
      });
    }

    function savePitchSourceType(index) {
      index.content_type="pitchSourceType";
      $rootScope.scopeWorkingVariable = true;

      masterdataService.postObj(index).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        index._id=response.data._id;
        console.log(response);
      });
    }
    function savePitchType(index) {
      index.content_type="pitchType";
      $rootScope.scopeWorkingVariable = true;

      masterdataService.postObj(index).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        index._id=response.data._id;

        console.log(response);
      });
    }
    function removePitchType(id) {
      $rootScope.scopeWorkingVariable = true;

      masterdataService.deleteMasterdataById(id).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
      console.log(response);
      });
    }
    function saveLocation(index) {
      index.content_type="location";
      $rootScope.scopeWorkingVariable = true;

      masterdataService.postObj(index).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        index._id=response.data._id;
        console.log(response);
      });
    }
    function saveTeam(index) {
      index.content_type="team";
      $rootScope.scopeWorkingVariable = true;

      masterdataService.postObj(index).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
        index._id=response.data._id;
        console.log(response);
      });
    }

    function removeLocation(id) {
      $rootScope.scopeWorkingVariable = true;

      masterdataService.deleteMasterdataById(id).then(function (response)
      {
        $rootScope.scopeWorkingVariable = false;
        if(response.status=200)
          toastr.success('Done','Operation Complete');
        else
          toastr.error('Error','Operation Was not complete');
      console.log(response);
      });
    }
    function saveLink(index) {

switch (index)
{
  case 0:
    $rootScope.scopeWorkingVariable = true;

    $scope.model.youtube.title="youtube";
    $scope.model.youtube.content_type="link";

    masterdataService.postObj($scope.model.youtube).then(getResponse );
    break;
  case 1:
    $rootScope.scopeWorkingVariable = true;

    $scope.model.vimeo.title="vimeo";
    $scope.model.vimeo.content_type="link";
    masterdataService.postObj($scope.model.vimeo).then(getResponse );

    break;
  case 2:
    $scope.model.dailymotion.title="dailymotion";
    $scope.model.dailymotion.content_type="link";
    $rootScope.scopeWorkingVariable = true;

    masterdataService.postObj($scope.model.dailymotion).then(getResponse );

    break;
  case 3:
    $scope.model.myvideo.title="myvideo";
    $scope.model.myvideo.content_type="link";
    $rootScope.scopeWorkingVariable = true;

    masterdataService.postObj($scope.model.myvideo).then(getResponse );

    break;
  case 4:
    $scope.model.clipfish.title="clipfish";
    $scope.model.clipfish.content_type="link";
    $rootScope.scopeWorkingVariable = true;

    masterdataService.postObj($scope.model.clipfish).then(getResponse );

    break;

  case 5:
    $scope.model.twitch.title="twitch";
    $scope.model.twitch.content_type="link";
    $rootScope.scopeWorkingVariable = true;

    masterdataService.postObj($scope.model.twitch).then(getResponse );

    break;

  case 6:
    $scope.model.sevenload.title="sevenload";
    $scope.model.sevenload.content_type="link";
    $rootScope.scopeWorkingVariable = true;

    masterdataService.postObj($scope.model.sevenload).then(getResponse );


    break;

}
    }
    function getResponse () {
      $rootScope.scopeWorkingVariable = false;
      if(response.status=200)
        toastr.success('Done','Operation Complete');
      else
        toastr.error('Error','Operation Was not complete');
$state.reload();
    }

  });
