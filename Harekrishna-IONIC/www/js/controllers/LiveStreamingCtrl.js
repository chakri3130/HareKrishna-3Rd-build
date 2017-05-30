angular.module('app.controllers').controller('liveStreamingCtrl', ['$scope', '$stateParams', '$sce', '$window', '$cordovaSocialSharing', '$cordovaFileTransfer', '$ionicPopup','$rootScope','$ionicHistory',
                                                                   function ($scope, $stateParams, $sce, $window, $cordovaSocialSharing, $cordovaFileTransfer, $ionicPopup,$rootScope,$ionicHistory) {
                                                                   
                                                                   if (window.Connection) {
                                                                   if (navigator.connection.type == Connection.NONE) {
                                                                   $ionicPopup.confirm({
                                                                                       title: 'No Internet Connection',
                                                                                       content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
                                                                                       })
                                                                   .then(function (result) {
                                                                         if (!result) {
                                                                         navigator.app.exitApp();
                                                                         }
                                                                         });
                                                                   }
                                                                   }
                                                                   
                                                                   $scope.$on('$ionicView.beforeEnter', function () {
                                                                              screen.unlockOrientation();
                                                                              $ionicHistory.clearHistory();
                                                                              $ionicHistory.clearCache();
                                                                              });
                                                                   
                                                                   $scope.progressbar = false;
                                                                   //alert($scope.title + " " + $scope.videoUrl);
                                                                   
                                                                   $scope.socialShare = function () {
                                                                   window.plugins.socialsharing.share('Featured Video:    http://www.sreecgmath.org/MobileApp/LiveVDO/039Janmasthan_Gwalpada_Arrival.mp4 '+ '\n\n' + "To download the App Click on      " + "   http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX"  , Constants.Paramhamsa_Vani, null, '\n\n' + "To download the App Click on      " + "   http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX", function (errormsg) { //alert("Error: Cannot Share");
                                                                                                      });
                                                                   };
                                                                   
                                                                   // Replace the channel ID
                                                                   $scope.liveStreamingURL = $sce.trustAsResourceUrl('https://www.youtube.com/embed/live_stream?channel=UCi8kVAnQq1DpBAcl6AmkMWQ');
                                                                   
                                                                   $scope.downloadFile = function () {
                                                                   
                                                                   $scope.progressbar = true;
                                                                   //var url = "http://www.gajotres.net/wp-content/uploads/2015/04/logo_radni.png";
                                                                   //var url = $scope.videoUrl;
                                                                   var url = "http://www.sreecgmath.org/MobileApp/LiveVDO/039Janmasthan_Gwalpada_Arrival.mp4";
                                                                   console.log(url);
                                                                   // File name only
                                                                   var filename = url.split("/").pop();
                                                                   //var filename = "test"+Math.random();
                                                                   
                                                                   // Save location
                                                                   var targetPath = cordova.file.documentsDirectory + filename;
                                                                   
                                                                   $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
                                                                                                                                 
                                                                                                                                 alert("Downloaded Successfully!");
                                                                                                                                 //console.log('Success'+JSON.stringify(result));
                                                                                                                                /*$ionicPopup.show({
                                                                                title: "Downloaded Successfully!",
                                                                                                                                                  scope: $scope,
                                                                                                                                                  buttons: [
                                                                                                                                                            { text: 'Ok' }]
                                                                                                                                                  })*/
                                                                                                                                 }, function (error) {
                                                                                                                                 console.log(JSON.stringify(error));
                                                                                                                                 }, function (progress) {
                                                                                                                                 $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                                                                                                 if ($scope.downloadProgress === 100) {
                                                                                                                                 $scope.progressbar = false;
                                                                                                                                 }
                                                                                                                                 });
                                                                   };
                                                                   
                                                                   $scope.$on('$ionicView.beforeLeave', function () {
                                                                              if (screen)
                                                                              screen.lockOrientation('portrait');
                                                                              });
                                                                   }])
