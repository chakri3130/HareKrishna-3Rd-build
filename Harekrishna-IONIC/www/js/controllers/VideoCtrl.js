angular.module('app.controllers').controller('videoCtrl', function ($scope, $stateParams, $window, $state, $rootScope, VideosServices, AudioPlayService,$ionicPopup,$ionicLoading) {
                                             
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
                                             
                                             $scope.show = function() {
                                             $ionicLoading.show({
                                                                template: '<ion-spinner></ion-spinner><p>Loading...</p>'
                                                                });
                                             };
                                             
                                             $scope.hide = function(){
                                             $ionicLoading.hide();
                                             };
                                             
                                             $scope.Videos = [];
                                             $scope.show($ionicLoading);
                                             VideosServices.getVideoData("https://harekrishna.tecnics.com/scgm/service.svc/Video/language=english")
                                             .then(function(response){
                                                   $scope.show($ionicLoading);
                                                   $scope.Videos = response.data;
                                                   $scope.hide($ionicLoading);
                                                   });
                                             
                                             
                                             
                                             
                                             $scope.language = 'English';
                                             $scope.PopulateVideos = function (type) {
                                             $scope.show($ionicLoading);
                                             $scope.language = type;
                                             $scope.VideoURL = "https://harekrishna.tecnics.com/scgm/service.svc/Video/language=" + type;
                                             VideosServices.getVideoData($scope.VideoURL).then(function(response){
                                                                                               $scope.Videos = response.data;
                                                                                               console.log($scope.Videos);
                                                                                               $scope.hide($ionicLoading);
                                                                                               });
                                             };
                                             
                                             $rootScope.IsNew = function (date) {
                                             var tempDate = new Date();
                                             var Created_Date = new Date(date);
                                             tempDate.setDate(tempDate.getDate() - 7);
                                             return (Created_Date >= tempDate) ? true : false;
                                             };
                                             
                                             $scope.PalyVideo = function (url) {
                                             var res = url.replace("watch?v=", "embed/");
                                             res = res + "?autoplay=1";
                                             AudioPlayService.setURL(res);
                                             $state.go("menu.VideoRedirect");
                                             };
                                             });
