angular.module('app.controllers').controller('blogCtrl', ['$scope', '$stateParams', '$sce','$timeout','$ionicLoading','$ionicPopup','$rootScope',
                                                          function ($scope, $stateParams, $sce, $timeout, $ionicLoading,$ionicPopup,$rootScope) {
                                                          
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
                                                          
                                                          
                                                          //$scope.blogURL =  $rootScope.url_blog;
                                                          // Logger.debug($scope.blogURL);
                                                          
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
                                                                   }, 4000);
                                                          
                                                          /* $scope.x = function () {
                                                           var url ="http://tirthagoswami.blogspot.in/?m=1";
                                                           window.open(url, '_blank', 'location=yes');
                                                           };*/
                                                          }]);







// angular.module('app.controllers').controller('blogCtrl', ['$scope', '$stateParams', '$sce',
//     function ($scope, $stateParams, $sce) {
//         $scope.x = function () {
//             var url =
//                 'https://docs.google.com/viewer?url=http://www.sreecgmath.org/archive/books/hindi/ChaitanyaCharitamrta_03_AntyaLila.pdf&embedded=true';
//             window.open(url, '_blank', 'location=yes');
//         };
//     }]);
