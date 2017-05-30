angular.module('app.controllers').controller('audioCtrl',
                                             ['$scope', '$stateParams', '$window', '$state', '$rootScope', 'AudioService', 'AudioPlayService', '$ionicHistory','$ionicPopup','$ionicLoading',function ($scope, $stateParams, $window, $state, $rootScope, AudioService, AudioPlayService,$ionicHistory,$ionicPopup,$ionicLoading) {
                                              
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
                                              else{
                                              
                                              $scope.show = function() {
                                              $ionicLoading.show({
                                                                 template: '<ion-spinner></ion-spinner><p>Loading...</p>'
                                                                 });
                                              };
                                              
                                              $scope.hide = function(){
                                              $ionicLoading.hide();
                                              };
                                              
                                              
                                              $scope.Audio = [];
                                              $scope.show($ionicLoading);
                                              AudioService.getAudioData("https://harekrishna.tecnics.com/scgm/service.svc/Audio/language=english").then(function (response) {
                                                                                                                                                        $scope.Audio = response.data;
                                                                                                                                                        $scope.hide($ionicLoading);
                                                                                                                                                        });
                                              
                                              $scope.language = 'English';
                                              $scope.PopulateAudio = function (type) {
                                              $scope.show($ionicLoading);
                                              $scope.language = type;
                                              $scope.Audio_URL = "https://harekrishna.tecnics.com/scgm/service.svc/Audio/language=" + type;
                                              AudioService.getAudioData($scope.Audio_URL).then(function (response) {
                                                                                               
                                                                                               $scope.Audio = response.data;
                                                                                               $scope.hide($ionicLoading);
                                                                                               
                                                                                               });
                                              };
                                              $scope.Redirect = function (data) {
                                              AudioPlayService.setURL(data);
                                              $ionicHistory.clearCache().then(function(){
                                                                              $state.go('menu.audioPlay');
                                                                              })
                                              };
                                              }
                                              }
                                              }]);
