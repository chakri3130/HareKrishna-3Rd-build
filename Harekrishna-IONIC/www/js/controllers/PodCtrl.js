angular.module('app.controllers').controller('podCtrl', ['$scope', '$stateParams', 'pod', '$cordovaSocialSharing', '$cordovaFileTransfer', '$ionicPopup','$ionicLoading','$timeout','$ionicHistory',
                                                         function ($scope, $stateParams, pod, $cordovaSocialSharing, $cordovaFileTransfer, $ionicPopup,$ionicLoading,$timeout,$ionicHistory) {
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
                                                         
                                                         $scope.$on('$ionicView.beforeEnter', function () {
                                                                    if (screen)
                                                                    screen.unlockOrientation();
                                                                    $ionicHistory.clearHistory();
                                                                    $ionicHistory.clearCache();
                                                                    
                                                                    });
                                                         
                                                         $scope.progressbar = false;
                                                         $scope.show($ionicLoading);
                                                         $timeout(function() {
                                                                  $scope.hide($ionicLoading);
                                                                  }, 1500);
                                                         pod.getData().then(function (data) {
                                                                            $scope.pic = encodeURI(data[0].Picture_URL);
                                                                            });
                                                         
                                                         
                                                         $scope.socialShare = function () {
                                                         window.plugins.socialsharing.share(null, null, $scope.pic, null, function (errormsg) { //alert("Error: Cannot Share");
                                                                                            });
                                                         };
                                                         
                                                         
                                                         
                                                         $scope.downloadFile = function () {
                                                         $scope.progressbar = true;
                                                         // File for download
                                                         //var url = "http://www.gajotres.net/wp-content/uploads/2015/04/logo_radni.png";
                                                         var url = encodeURI($scope.pic);
                                                         // File name only
                                                         var filename = url.split("/").pop();
                                                         //var filename = Math.random();
                                                         
                                                         // Save location
                                                         var targetPath = cordova.file.documentsDirectory + filename;
                                                         $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
                                                                                                                       console.log('Success' + JSON.stringify(result));
                                                                                                                       $ionicPopup.show({
                                                                                                                                        title: "Downloaded Successfully!",
                                                                                                                                        scope: $scope,
                                                                                                                                        buttons: [
                                                                                                                                                  {text: 'Ok'}]
                                                                                                                                        })
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
                                                         }]);
