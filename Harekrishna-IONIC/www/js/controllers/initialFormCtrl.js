angular.module('app.controllers').controller('initialFormCtrl',
                                             function ($scope, $state, LivePostData, $rootScope, $ionicPopup, $ionicHistory, $timeout) {
                                             
                                             
                                             $scope.$on('$ionicView.beforeEnter', function () {
                                                        console.log("hi");
                                                        var applaunchCount = window.localStorage.getItem('launchCountForm');
                                                        if (applaunchCount)
                                                        $ionicHistory.goBack();
                                                        });
                                             
                                             $scope.temp = { Name: '', Email: '', Location: ' ', Country: '', MessageFromSirilaGuruDev: ' ' };
                                             $scope.submitUserDetails = function () {
                                             Logger.debug($scope.temp);
                                             //$scope.temp = formObject;
                                             window.localStorage.setItem('launchCountForm', 1);
                                             LivePostData.PostLiveData($scope.temp).then(function (response) {
                                                                                         //console.log(response.data + " " + response);
                                                                                         $scope.User_ID = response.data.User_detailsResult;
                                                                                         window.localStorage.setItem('UserID', $scope.User_ID);
                                                                                         
                                                                                         
                                                                                         $rootScope.Redirect = "LiveVideo";
                                                                                         //  $ionicPopup.show({
                                                                                         //       title: "Downloaded Successfully!",
                                                                                         //       scope: $scope,
                                                                                         //       buttons: [
                                                                                         //           { text: 'Ok' }]
                                                                                         //       })
                                                                                         //alert("Registered Successfully!")
                                                                                         //$state.go('menu.home');
                                                                                         
                                                                                         $ionicPopup.show({
                                                                                                          title: "Registered Successfully!",
                                                                                                          scope: $scope,
                                                                                                          buttons: [
                                                                                                                    {text: 'Ok'}]
                                                                                                          })
                                                                                         
                                                                                         if ($rootScope.title === "Live Streaming") {
                                                                                         $timeout(function () {
                                                                                                  window.open($rootScope.videoUrl, '_system');
                                                                                                  }, 500);
                                                                        $ionicHistory.goBack();
                                                                        //$state.go('menu.home');
                                                                                         }
                                                                                         else if ($rootScope.title === "Featured Video") {
                                                                                         $state.go("menu.liveStreaming");
                                                                                         }
                                                                                         
                                                                                         
                                                                                         
                                                                                         //$state.go('menu.liveStreaming
                                                                                         // }
                                                                                         });
                                             };
                                             
                                             $scope.closeModal = function () {
                                             //Logger.alert("called");
                                             $state.go("menu.home");
                                             };
                                             
                                             });
