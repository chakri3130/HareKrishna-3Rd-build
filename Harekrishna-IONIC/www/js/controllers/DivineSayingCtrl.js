
angular.module('app.controllers').controller('divineSayingCtrl', ['$scope', '$stateParams', '$window', 'sod', '$cordovaSocialSharing','$ionicLoading','$timeout','$ionicPopup','$ionicHistory',
                                                                  function ($scope, $stateParams, $window, sod, $cordovaSocialSharing,$ionicLoading,$timeout,$ionicPopup,$ionicHistory) {
                                                                  
                                                                  if(window.Connection) {
                                                                  if(navigator.connection.type == Connection.NONE) {
                                                                  $ionicPopup.confirm({
                                                                                      title: 'No Internet Connection',
                                                                                      content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
                                                                                      })
                                                                  .then(function(result) {
                                                                        if(!result) {
                                                                        navigator.app.exitApp();
                                                                        }
                                                                        });
                                                                  }
                                                                  }
                                                                  
                                                                  $scope.$on('$ionicView.beforeEnter', function () {
                                                                             $ionicHistory.clearHistory();
                                                                             $ionicHistory.clearCache();
                                                                             });
                                                                  
                                                                  //$ionicHistory.clearHistory();
                                                                  $scope.show = function() {
                                                                  $ionicLoading.show({
                                                                                     template: '<ion-spinner></ion-spinner><p>Loading...</p>'
                                                                                     });
                                                                  };
                                                                  
                                                                  $scope.hide = function(){
                                                                  $ionicLoading.hide();
                                                                  };
                                                                  
                                                                  
                                                                  $scope.value = true;
                                                                  $scope.var = 1;
                                                                  
                                                                  $scope.clicked = function (num) {
                                                                  $scope.var = num;
                                                                  };
                                                                  $scope.langChan = function () {
                                                                  if ($scope.var == 1) {
                                                                  $scope.value = true;
                                                                  } else {
                                                                  $scope.value = false;
                                                                  }
                                                                  };
                                                                  
                                                                  $scope.show($ionicLoading);
                                                                  $timeout(function() {
                                                                           $scope.hide($ionicLoading);
                                                                           }, 1500);
                                                                  sod.getData().then(function (data) {
                                                                                     $scope.sodEng = data[0].English_Saying;
                                                                                     $scope.sodHin = data[0].Hindi_Saying;
                                                                                     //$scope.hide($ionicLoading);
                                                                                     });
                                                                  
                                                                  count = 0;
                                                                  //$scope.urlo = 'http://www.sreecgmath.org/MobileApp/app/004_DailyMessages_DivineSaying_BG/quotes_g3.png';
                                                                  $scope.templates = [];
                                                                  $scope.resultTempltes = [];
                                                                  sod.getTemplateData().then(function (response) {
                                                                                             $scope.templates = response;
                                                                                             $scope.templatesCount = $scope.templates.length;
                                                                                             for(var i=0;i<$scope.templatesCount;i++){
                                                                                             if($scope.templates[i].Active_Flag)
                                                                                             {
                                                                                             count++;
                                                                                             $scope.resultTempltes.push({"Template_URL" : $scope.templates[i].Template_URL});
                                                                                             }
                                                                                             }
                                                                                             
                                                                                             if(count === 0){
                                                                                             $scope.templateURL = "img/wk157VZaQDyY03TMSuOj_topdivinesaying.png"; 
                                                                                             }
                                                                                             else
                                                                                             {
                                                                                             $scope.templatePicked = Math.floor(Math.random() * count);
                                                                                             //$window.alert( " " + $scope.templates[$scope.templatePicked].Template_URL);
                                                                                             $scope.templateURL = $scope.resultTempltes[$scope.templatePicked].Template_URL;
                                                                                             }
                                                                                             }, function (error) {
                                                                                             //$window.alert("error template:" + error);
                                                                                             });
                                                                  
                                                                  $scope.socialShare = function () {
                                                                  
                                                                  window.plugins.socialsharing.share('Divine Saying:  ' +'\n\n'+' English: ' + $scope.sodEng +'\n\n'+'Hindi: ' + $scope.sodHin   + '\n\n\n ' + "To download the App Click on " + '\n' + "  http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX", 'Paramhamsa Vani', null , +'\n\n' + 'To download the App Click on ' + "  http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX", function (errormsg) { //alert("Error: Cannot Share");
                                                                                                     });
                                                                  };
                                                                  }])
