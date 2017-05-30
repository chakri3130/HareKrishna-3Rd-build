angular.module('app.controllers').controller('menuCtrl', ['$scope', '$stateParams', 'locbData', '$window', '$sce', 'darshanTiming', '$ionicPopup', '$ionicModal', '$state', 'LivePostData', '$rootScope',
                                                          function ($scope, $stateParams, locbData, $window, $sce, darshanTiming, $ionicPopup, $ionicModal, $state, LivePostData, $rootScope) {
                                                          $scope.winWidth = window.screen.width;
                                                          
                                                          
                                                          
                                                          $scope.OpenUrl = function (url) {
                                                          $window.open(url, '_blank', 'location=yes');
                                                          };
                                                          
                                                          $scope.showMedia = false;
                                                          $scope.mediaIcon = 'ion-ios-arrow-right';
                                                          $scope.dailyDarsan = false;
                                                          $scope.dailyDarsanIcon = 'ion-ios-arrow-right';
                                                          
                                                          
                                                          $scope.dailyDarsandown = function () {
                                                          if ($scope.dailyDarsan === true) {
                                                          $scope.dailyDarsan = false;
                                                          $scope.dailyDarsanIcon = 'ion-ios-arrow-right';
                                                          
                                                          } else {
                                                          $scope.dailyDarsan = true;
                                                          $scope.dailyDarsanIcon = 'ion-ios-arrow-down';
                                                          }
                                                          };
                                                          
                                                          $scope.mediaDown = function () {
                                                          if ($scope.showMedia === true) {
                                                          $scope.showMedia = false;
                                                          $scope.mediaIcon = 'ion-ios-arrow-right';
                                                          } else {
                                                          $scope.showMedia = true;
                                                          $scope.mediaIcon = 'ion-ios-arrow-down';
                                                          }
                                                          };
                                                          
                                                          $scope.myFunction = function () {
                                                          var d = new Date().toUTCString();
                                                          d = d.substring(17, 22);
                                                          dh = d.substring(0, 2);
                                                          dm = d.substring(3, 6);
                                                          time = dh + ":" + dm;
                                                          return time;
                                                          };
                                                          
                                                          getURL = function () {
                                                          for (var i = 0; i < urlDataLength; i++) {
                                                          data = urlData[i];
                                                          if (data.Type_Name == "OfflineVideo") {
                                                          $scope.offline_content = data.Remarks;
                                                          $scope.url_offline = data.URL;
                                                          console.log('offline video: ', $scope.url_offline);
                                                          }
                                                          else if (data.Type_Name == "LiveVideo") {
                                                          if (data.Active_flag) {
                                                          $scope.Live_content = data.Remarks;
                                                          $scope.url_live = data.URL;
                                                          console.log('live: ', $scope.url_live);
                                                          }
                                                          }
                                                          else if (data.Type_Name == "Chat") {
                                                          $scope.url_chat = data.URL;
                                                          console.log('chat: ', $scope.url_chat);
                                                          }
                                                          else if (data.Type_Name == "Blog") {
                                                          $rootScope.url_blog = data.URL;
                                                          console.log('blog: ', $rootScope.url_blog);
                                                          }
                                                          else if (data.Type_Name == "Calender PDF") {
                                                          $rootScope.calender_pdf = data.URL;
                                                          console.log('Calender PDF: ', $rootScope.calender_pdf);
                                                          }
                                                          }
                                                          };
                                                          
                                                          ToUTC = function (ist) {
                                                          hh = ist.substring(0, 2) - 05;
                                                          mm = ist.substring(3, 5) - 30;
                                                          if (mm < 0) {
                                                          mm = mm + 60;
                                                          hh = hh - 01;
                                                          }
                                                          
                                                          if (hh < 0) {
                                                          hh = hh + 24;
                                                          }
                                                          hh = hh > 9 ? hh : '0' + hh;
                                                          mm = mm > 9 ? mm : '0' + mm;
                                                          utc = hh + ":" + mm;
                                                          return utc;
                                                          }
                                                          
                                                          
                                                          $scope.$on('$ionicView.enter', function () {
                                                                     locbData.getData().then(function (data) {
                                                                                             console.log("urlData", data);
                                                                                             urlData = data;
                                                                                             urlDataLength = data.length;
                                                                                             console.log(urlDataLength);
                                                                                             getURL();
                                                                                             $scope.darshanTiming = [];
                                                                                             darshanTiming.getdarshanTiming().then(function (response) {
                                                                                                                                   $scope.darshanTiming = response;
                                                                                                                                   
                                                                                                                                   //$window.alert($scope.darshanTiming[0].Message.substring(19, 26) +" " + $scope.myFunction());
                                                                                                                                   PresentTime = $scope.myFunction();
                                                                                                                                   
                                                                                                                                   $scope.darshanTiming[0].From_Time = ToUTC($scope.darshanTiming[0].From_Time);
                                                                                                                                   $scope.darshanTiming[0].To_Time = ToUTC($scope.darshanTiming[0].To_Time);
                                                                                                                                   
                                                                                                                                   $rootScope.title = "";
                                                                                                                                   
                                                                                                                                   if ($scope.darshanTiming[0].No_Darshan === 'true') {
                                                                                                                                   $scope.videoUrl = $sce.trustAsResourceUrl($scope.url_offline);
                                                                                                                                   $rootScope.videoUrl = $sce.trustAsResourceUrl($scope.url_offline);
                                                                                                                                   $scope.title = "Featured Video";
                                                                                                                                   $rootScope.title = "Featured Video";
                                                                                                                                   $scope.content = $scope.offline_content;
                                                                                                                                   if (window.plugins.streamingMedia)
                                                                                                                                   window.plugins.streamingMedia.playVideo($sce.trustAsResourceUrl($scope.url_offline), $scope.options);
                                                                                                                                   }
                                                                                                                                   else if (PresentTime > $scope.darshanTiming[0].From_Time && PresentTime < $scope.darshanTiming[0].To_Time) {
                                                                                                                                   $scope.title = "Live Streaming";
                                                                                                                                   $rootScope.title = "Live Streaming";
                                                                                                                                   $scope.videoUrl = $sce.trustAsResourceUrl($scope.url_live);
                                                                                                                                   $rootScope.videoUrl = $sce.trustAsResourceUrl($scope.url_live);
                                                                                                                                   //alert($scope.url_live);
                                                                                                                                   $scope.content = $scope.Live_content;
                                                                                                                                   if (window.plugins.streamingMedia)
                                                                                                                                   window.plugins.streamingMedia.playVideo($scope.videoUrl, $scope.options);
                                                                                                                                   $scope.TempData = { userID: ' ', viewDateTime: '', platform: '' };
                                                                                                                                   $scope.TempData.userID = window.localStorage.getItem('UserID');
                                                                                                                                   $scope.TempData.viewDateTime = new Date();
                                                                                                                                   $scope.TempData.platform = ionic.Platform.platform();
                                                                                                                                   LivePostData.PostLiveViewData($scope.TempData).then(function (response) {
                                                                                                                                                                                       console.log(response.data);
                                                                                                                                                                                       }, function (err) {
                                                                                                                                                                                       console.log("error is:" + err);
                                                                                                                                                                                       });
                                                                                                                                   }
                                                                                                                                   else {
                                                                                                                                   $scope.videoUrl = $sce.trustAsResourceUrl($scope.url_offline);
                                                                                                                                   $rootScope.videoUrl = $sce.trustAsResourceUrl($scope.url_offline);
                                                                                                                                   $rootScope.title = "Featured Video";
                                                                                                                                   $scope.title = "Featured Video";
                                                                                                                                   $scope.content = $scope.offline_content;
                                                                                                                                   if (window.plugins.streamingMedia)
                                                                                                                                   window.plugins.streamingMedia.playVideo($sce.trustAsResourceUrl($scope.url_offline), $scope.options);
                                                                                                                                   }
                                                                                                                                   }, function (error) {
                                                                                                                                   //$window.alert(error );
                                                                                                                                   });
                                                                                             
                                                                                             });

                                                                                             });
                                                                     
                                                                     
                                                          
                                                          $scope.SelectedView = function () {
                                                          var applaunchCount = window.localStorage.getItem('launchCountForm');
                                                          if (applaunchCount) {
                                                          if( $rootScope.title === "Live Streaming")
                                                          {
                                                          window.open($scope.videoUrl, '_system');
                                                          }
                                                          else if( $rootScope.title === "Featured Video")
                                                          {
                                                          $state.go("menu.liveStreaming");
                                                          }
                                                          }
                                                          else {
                                                          $state.go('menu.InitialForm');
                                                          }
                                                          }
                                                          }]);













