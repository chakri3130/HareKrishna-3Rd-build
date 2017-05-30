angular.module('app.controllers').controller('homeCtrl', ['$scope', '$stateParams', '$ionicPlatform', '$ionicModal', '$state', 'darshanTiming', 'LivePostData', '$ionicPopup', 'cal', '$ionicLoading', '$rootScope',
                                                          function ($scope, $stateParams, $ionicPlatform, $ionicModal, $state, darshanTiming, LivePostData, $ionicPopup, cal, $ionicLoading, $rootScope) {
                                                          
                                                          //alert(JSON.stringify(ionic.Platform.platform()));
                                                          
                                                          
                                                          document.addEventListener("deviceready", onDeviceReady, false);
                                                          function onDeviceReady() {
                                                          $scope.$on('$ionicView.beforeEnter', function () {
                                                                     if ($rootScope.Notification === "Event") {
                                                                     $state.go("menu.notifications");
                                                                     }
                                                                     else if ($rootScope.Notification === "SOD") {
                                                                     $state.go("menu.divineSaying");
                                                                     }
                                                                     // else if( $rootScope.Redirect = "LiveVideo")
                                                                     // {
                                                                     //    $rootScope.Redirect = "";
                                                                     //    window.open($rootScope.videoUrl,'_system');
                                                                     // }
                                                                     });
                                                          
                                                          if (window.Connection) {
                                                          if (navigator.connection.type == Connection.NONE) {
                                                          $scope.template_url = 'img/rkeuf4wR5GKev0pjdmcw_landingimg.jpg';
                                                          }
                                                          else {
                                                          $scope.show = function () {
                                                          $ionicLoading.show({
                                                                             template: '<ion-spinner></ion-spinner><p>Loading...</p>'
                                                                             });
                                                          };
                                                          
                                                          $scope.hide = function () {
                                                          $ionicLoading.hide();
                                                          };
                                                          
//                                                          d = new Date();
//                                                          y = new Date().getFullYear();
//                                                          m = new Date().getMonth()+1;
//                                                          $scope.show($ionicLoading);
//                                                          cal.getData(y, m).then(function (data) {
//                                                                                 events = data;
//                                                                                 //alert(JSON.stringify(events));
//                                                                                 now = new Date();
//                                                                                 $scope.template_url = '0';
//                                                                                 
//                                                                                 for (var i = 0; i < events.length; i++) {
//                                                                                 if (events[i].startTime < now && events[i].endTime > now) {
//                                                                                 $scope.template_url = encodeURI(events[i].homeTemplate_URL);
//                                                                                 Logger.debug("Template URL : " + $scope.template_url);
//                                                                                 $scope.hide($ionicLoading);
//                                                                                 }
//                                                                                 }
//                                                                                 if ($scope.template_url === '0') {
//                                                                                 $scope.template_url = 'img/rkeuf4wR5GKev0pjdmcw_landingimg.jpg';
//                                                                                 Logger.debug("default Image: " + $scope.template_url);
//                                                                                 }
//                                                                                 $scope.hide($ionicLoading);
//                                                                                 });
//                                                          }
//                                                          }
//                                                          }
                                                          
                                                          
                                                          $scope.show($ionicLoading);
                                                          cal.getHomeTemplate().then(function (data) {
                                                                                     if(data.data.Table[0] != undefined && data.data.Table[0] != 'undefined')
                                                                                     {
                                                                                     $scope.template_url = data.data.Table[0].HomeTemplate_URL;
                                                                                     }
                                                                                     else{
                                                                                     $scope.template_url = 'img/rkeuf4wR5GKev0pjdmcw_landingimg.jpg';
                                                                                     }
                                                                                     $scope.hide($ionicLoading);
                                                                                     }, function(error)
                                                                                     {
                                                                                     $scope.template_url = 'img/rkeuf4wR5GKev0pjdmcw_landingimg.jpg';
                                                                                     $scope.hide($ionicLoading);
                                                                                     });
                                                          }
                                                          }
                                                          }
                                                          
                                                          
                                                          $scope.timeZone = new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1];
                                                          if (typeof analytics !== 'undefined') {
                                                          analytics.trackView(Constants.Paramhamsa_Vani);
                                                          }
                                                          
                                                          $scope.LocalTime = function (time) {
                                                          var utc_date = new Date();
                                                          var offset = new Date().getTimezoneOffset();
                                                          utc_date.setHours(time.substring(0, 2), time.substring(3, 5), 00, 00);
                                                          utc_date.setMinutes(utc_date.getMinutes() - offset - 330);
                                                          localTime = utc_date.toString().substring(16, 21);
                                                          return localTime;
                                                          };
                                                          
                                                          $scope.No_DarshanDisplay = false;
                                                          $scope.darshanTiming = [];
                                                          darshanTiming.getdarshanTiming().then(function (response) {
                                                                                                $scope.darshanTiming = response;
                                                                                                $scope.No_DarshanDisplay = $scope.darshanTiming[0].No_Darshan;
                                                                                                $scope.darshanTiming[0].From_Time = $scope.LocalTime($scope.darshanTiming[0].From_Time);
                                                                                                $scope.darshanTiming[0].To_Time = $scope.LocalTime($scope.darshanTiming[0].To_Time);
                                                                                                $scope.LiveDarshan = $scope.darshanTiming[0].From_Time + "-" + $scope.darshanTiming[0].To_Time;
                                                                                                });
                                                          
                                                          $scope.showPopup = function () {
                                                          $state.go('menu.notifications');
                                                          };
                                                          }]);


// $scope.TempData = { userID: ' ', viewDateTime: '', platform: '' };
// $scope.TempData.userID = window.localStorage.getItem('UserID');
// $scope.TempData.viewDateTime = new Date();
// $scope.TempData.platform = ionic.Platform.platform();
// LivePostData.PostLiveViewData($scope.TempData).then(function (response) {
//   console.log(response.data);
// }, function (err) {
//   console.log("error is:" + JSON.stringify(err));
// });
