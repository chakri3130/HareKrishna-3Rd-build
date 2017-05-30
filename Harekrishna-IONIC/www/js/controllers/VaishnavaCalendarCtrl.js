angular.module('app.controllers').controller('vaishnavaCalendarCtrl', ['$scope', '$stateParams', 'CalData', 'cal', '$timeout', '$cordovaSocialSharing', '$cordovaFileTransfer','$ionicPopup',
                                                                       function ($scope, $stateParams, CalData, cal, $timeout, $cordovaSocialSharing, $cordovaFileTransfer,$ionicPopup) {
                                                                       
                                                                       $scope.progressbar = false;
                                                                       var m;
                                                                       var y;
                                                                       var months = ["January", "February", "March",
                                                                                     "April", "May", "June", "July", "August",
                                                                                     "September", "October", "November", "December"
                                                                                     ];
                                                                       
                                                                       var currentDate = new Date();
                                                                       $scope.viewTitle = "Vaishnava Calandar";
                                                                       
                                                                       monthHead = function (currentMonth) {
                                                                       $scope.month = months[currentMonth];
                                                                       m = currentDate.getMonth() + 1;
                                                                       y = currentDate.getFullYear();
                                                                       console.log(m, y);
                                                                       CalData.getCalData(m, y).then(function (data) {
                                                                                                     $scope.dataList = data;
                                                                                                     });
                                                                       };
                                                                       monthHead(currentDate.getMonth());
                                                                       console.log($scope.month);
                                                                       
                                                                       $scope.prev = function () {
                                                                       currentDate.setMonth(currentDate.getMonth() - 1);
                                                                       monthHead(currentDate.getMonth());
                                                                       $scope.$broadcast('changeDate', -1);
                                                                       };
                                                                       $scope.next = function () {
                                                                       currentDate.setMonth(currentDate.getMonth() + 1);
                                                                       monthHead(currentDate.getMonth());
                                                                       $scope.$broadcast('changeDate', 1);
                                                                       
                                                                       };
                                                                       
                                                                       $scope.calendar = {};
                                                                       $scope.changeMode = function (mode) {
                                                                       $scope.calendar.mode = mode;
                                                                       };
                                                                       
                                                                       $scope.loadEvents = function () {
                                                                       cal.getData().then(function (data) {
                                                                                          //          var events = data;
                                                                                          
                                                                                          console.log("events ", data);
                                                                                          // $scope.calendar.eventSource = data;
                                                                                          });
                                                                       //        $scope.calendar.eventSource = createRandomEvents();
                                                                       //        console.log("load", $scope.calendar.eventSource)
                                                                       };
                                                                       
                                                                       $scope.onEventSelected = function (event) {
                                                                       // console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
                                                                       };
                                                                       
                                                                       $scope.onViewTitleChanged = function (title) {
                                                                       $scope.viewTitle = title;
                                                                       };
                                                                       
                                                                       $scope.today = function () {
                                                                       $scope.calendar.currentDate = new Date();
                                                                       };
                                                                       
                                                                       $scope.isToday = function () {
                                                                       var today = new Date(),
                                                                       currentCalendarDate = new Date($scope.calendar.currentDate);
                                                                       
                                                                       today.setHours(0, 0, 0, 0);
                                                                       currentCalendarDate.setHours(0, 0, 0, 0);
                                                                       return today.getTime() === currentCalendarDate.getTime();
                                                                       };
                                                                       
                                                                       $scope.onTimeSelected = function (selectedTime, events) {
                                                                       // console.log('Selected time: ' + selectedTime + ', hasEvents: ' + (events !== undefined && events.length !== 0));
                                                                       };
                                                                       
                                                                       function eventsList() {
                                                                       var events = [];
                                                                       
                                                                       }
                                                                       
                                                                       
                                                                       
                                                                       function createRandomEvents() {
                                                                       var events;
                                                                       
                                                                       cal.getData(y, m).then(function (data) {
                                                                                              events = data;
                                                                                              
                                                                                              console.log("events ", JSON.stringify(data));
                                                                                              $scope.calendar.eventSource = data;
                                                                                              //            $timeout(function(){
                                                                                              //          $scope.calendar.eventSource = JSON.parse(JSON.stringify(data));
                                                                                              //                },30000);
                                                                                              //            $scope.eventSource = data;
                                                                                              });
                                                                       return events;
                                                                       }
                                                                       createRandomEvents();
                                                                       
                                                                       $scope.socialShare = function () {
                                                                       window.plugins.socialsharing.share('VaishnavaCalender2016-17  '  + '\n\n\n' + "To download the App Click on "+ "\n  http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX", 'Paramhamsa Vani', "http://www.sreecgmath.org/MobileApp/app/Calendar16-17.pdf", + '\n\n' + "To download the App Click on  " + '\n' +  " http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX", function (errormsg) { //alert("Error: Cannot Share");
                                                                                                          });
                                                                       };
                                                                       
                                                                       
                                                                       $scope.downloadFile = function () {
                                                                       $scope.progressbar = true;
                                                                       $scope.pdf = "http://www.sreecgmath.org/MobileApp/app/Calendar16-17.pdf"
                                                                       var url = encodeURI($scope.pdf);
                                                                       
                                                                       // File name only
                                                                       var filename = url.split("/").pop();
                                                                       //var filename = "test"+Math.random();
                                                                       
                                                                       // Save location
                                                                       var targetPath = cordova.file.documentsDirectory + filename;
                                                                       $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
                                                                                                                                     console.log('Success' + JSON.stringify(result));
                                                                                                                                     //alert('Downloaded Succefully');
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
                                                                       }]);
