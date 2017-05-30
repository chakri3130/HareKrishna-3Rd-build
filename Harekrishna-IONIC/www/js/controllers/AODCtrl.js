angular.module('app.controllers').controller('aodCtrl', ['$scope', '$stateParams', 'aod','$ionicLoading','$timeout','$ionicPopup',
                                                         function ($scope, $stateParams, aod, $ionicLoading, $timeout,$ionicPopup) {
                                                         
                                                         if(window.Connection) {
                                                         if(navigator.connection.type == Connection.NONE) {
                                                         $ionicPopup.confirm({
                                                                             title: 'No Internet Connection',
                                                                             content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
                                                                             })
                                                         .then(function(result) {
                                                               if(!result) {
                                                               ionic.Platform.exitApp();
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
                                                         
                                                         $scope.show($ionicLoading);
                                                         $timeout(function() {
                                                                  $scope.hide($ionicLoading);
                                                                  }, 1500);
                                                         //console.log("logrecorded")
                                                         aod.getData().then(function (data) {
                                                                            $scope.aTitle = data[0].Article_Title;
                                                                            $scope.aContent = data[0].Article_Content;
                                                                            $scope.socialShare = function () {
                                                                            window.plugins.socialsharing.share('Harikatha Nectar: ' + '\n' + $scope.aTitle  + '-' +  '\n' + $scope.aContent             + "\n\n\nTo download the App Click on "+ "\n  http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX" , 'Paramhamsa Vani', null , '\n\n' + 'To download the App Click on ' + "  http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX", function (errormsg) { //alert("Error: Cannot Share");
                                                                                                               });
                                                                            };
                                                                            });
                                                         }]);
