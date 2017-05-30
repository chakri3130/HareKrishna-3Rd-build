angular.module('app.controllers').controller('VideoRedirectCtrl', ['$scope', '$stateParams', 'AudioPlayService', '$cordovaSocialSharing', '$cordovaFileTransfer',
                                                                   function ($scope, $stateParams, AudioPlayService, $cordovaSocialSharing, $cordovaFileTransfer) {
                                                                   
                                                                   $scope.playerVars = {
                                                                   modestbranding: 1,
                                                                   autohide: 1,
                                                                   showinfo: 0,
                                                                   controls: 1,
                                                                   autoplay: 1,
                                                                   fs: 1,
                                                                   allowfullscreen: 1
                                                                   };
                                                                   
                                                                   $scope.$on('$ionicView.beforeEnter', function () {
                                                                              if (screen)
                                                                              screen.unlockOrientation();
                                                                              });
                                                                   
                                                                   $scope.progressbar = false;
                                                                   $scope.url = AudioPlayService.getURL();
                                                                   
                                                                   $scope.anotherGoodOne = $scope.url;
                                                                   console.log($scope.anotherGoodOne);
                                                                   
                                                                   $scope.$on('youtube.player.ready', function ($event, player) {
                                                                              player.playVideo();
                                                                              });
                                                                   $scope.$on('youtube.player.pause', function ($event, player) {
                                                                              player.close();
                                                                              });
                                                                   
                                                                   $scope.videoUrl = $scope.anotherGoodOne + '?.mp4';
                                                                   $scope.socialShare = function () {
                                                                   window.plugins.socialsharing.share('Video: '+ '\n' + $scope.videoUrl    + '\n\n\n' +  "To download the App Click on "+ '\n' + " http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX", 'Paramahams Vani', null , + '\n\n' + 'To download the App Click on  ' + '\n' + " http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX", function (errormsg) { //alert("Error: Cannot Share");
                                                                                                      });
                                                                   };
                                                                   
                                                                   $scope.$on('$ionicView.beforeLeave', function () {
                                                                              if (screen)
                                                                              screen.lockOrientation('portrait');
                                                                              });
                                                                   
                                                                   
                                                                   $scope.downloadFile = function () {
                                                                   
                                                                   // File for download
                                                                   $scope.progressbar = true;
                                                                   $scope.videoUrl = $scope.anotherGoodOne + '?.mp4';
                                                                   var url = $scope.videoUrl;
                                                                   
                                                                   var options = {};
                                                                   options.mimeType = ".mp4";
                                                                   
                                                                   //console.log(url);
                                                                   
                                                                   // File name only
                                                                   var filename = url.split("/").pop();
                                                                   //var filename = "test"+Math.random();
                                                                   
                                                                   // Save location
                                                                   var targetPath = cordova.file.documentsDirectory + filename + '.mp4';
                                                                   var uri = encodeURI(url);
                                                                   
                                                                   $cordovaFileTransfer.download(uri, targetPath, options, true).then(function (result) {
                                                                                                                                      console.log('Success' + JSON.stringify(result));
                                                                                                                                      //alert('Success');
                                                                                                                                      console.log(url);
                                                                                                                                      
                                                                                                                                      }, function (error) {
                                                                                                                                      console.log(JSON.stringify(error));
                                                                                                                                      }, function (progress) {
                                                                                                                                      $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                                                                                                      if ($scope.downloadProgress === 100) {
                                                                                                                                      $scope.progressbar = false;
                                                                                                                                      }
                                                                                                                                      });
                                                                   };
                                                                   }]);
