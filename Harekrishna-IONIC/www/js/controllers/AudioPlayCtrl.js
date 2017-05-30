angular.module('app.controllers').controller('audioPlayCtrl', ['$scope', '$stateParams', '$state', '$rootScope',
                                                               '$window', '$cordovaMedia', '$ionicLoading', 'AudioPlayService', '$interval', '$cordovaSocialSharing', '$cordovaFileTransfer', '$ionicPopup', function ($scope, $stateParams, $state, $rootScope, $window, $cordovaMedia, $ionicLoading, AudioPlayService, $interval, $cordovaSocialSharing, $cordovaFileTransfer, $ionicPopup) {
                                                               
                                                               $scope.enable = true;
                                                               $scope.progressbar = false;
                                                               //$scope.url = AudioPlayService.getItem();
                                                               $scope.play = false;
                                                               $scope.change = 0;
                                                               $scope.changeValue = function () {
                                                               $interval(function () {
                                                                         $scope.change++;
                                                                         },
                                                                         10);
                                                               };
                                                               
                                                               $scope.AudioListIs   = AudioPlayService.getURL();
                                                               
                                                               // $scope.AudioListIs = [];
                                                               // AudioPlayService.getUrlBasedAudioList($rootScope.AudioURL).then(function (response) {
                                                               //   var AudioSubList = response.data.Table;
                                                               //   $scope.AudioListIs.push(AudioSubList);
                                                               // });
                                                               
                                                               var media = null;
                                                               $scope.PlayAudio = function (url,name,index) {
                                                               $rootScope.AudioPlayURL = encodeURI(url);
                                                               $rootScope.AudioDownload = url;
                                                               $scope.url = name;
                                                               if (media !== null) {
                                                               media.stop();
                                                               media.release();
                                                               media = null;
                                                               $scope.value2 = 0;
                                                               $scope.play = false;
                                                               }
                                                               media = new Media(encodeURI(url),
                                                                                 function () {
                                                                                 //alert("playAudio():Audio Success");
                                                                                 },
                                                                                 function (err) {
                                                                                 // alert("playAudio():Audio Error: " + err);
                                                                                 }, function (status) {
                                                                                 if (status == 1) {
                                                                                 //$ionicLoading.show({ template: 'Loading...' });
                                                                                 } else {
                                                                                 // $ionicLoading.hide();
                                                                                 $scope.duration = media.getDuration();
                                                                                 }
                                                                                 }
                                                                                 );
                                                               media.play();
                                                               $scope.play = true;
                                                               $scope.enable = false;
                                                               $scope.Previous = (index === 0) ?{url : $scope.AudioListIs[$scope.AudioListIs.length - 1].url , name : $scope.AudioListIs[$scope.AudioListIs.length - 1].sTitle}: {url:$scope.AudioListIs[index - 1].url,name:$scope.AudioListIs[index - 1].sTitle};
                                                               $scope.Next = ($scope.AudioListIs[index + 1] === undefined) ? {url:$scope.AudioListIs[0].url,name:$scope.AudioListIs[index - 1].sTitle} : {url:$scope.AudioListIs[index + 1].url,name:$scope.AudioListIs[index + 1].sTitle};
                                                               $scope.NextIndex = ($scope.AudioListIs[index + 1] === undefined) ? 0 : index + 1;
                                                               $scope.PreviousIndex = (index === 0) ? $scope.AudioListIs.length - 1 : index - 1;
                                                               
                                                               var counter = 0;
                                                               $scope.timerDur = $interval(function () {
                                                                                           counter = counter + 100;
                                                                                           if (counter > 2000) {
                                                                                           clearInterval($scope.timerDur);
                                                                                           }
                                                                                           dur = media.getDuration();
                                                                                           valP = Math.round(dur);
                                                                                           var min = Math.floor(valP / 60);
                                                                                           if(min == -1) min = 0;
                                                                                           min = (min >-1 && min < 10)? "0" + min : min;
                                                                                           var sec = valP % 60;
                                                                                           if(sec == -1) sec = 0;
                                                                                           sec = (sec > -1 && sec < 10) ? "0" + sec : sec;
                                                                                           var time1 = min + ":" + sec;
                                                                                           $scope.durMax = time1;
                                                                                           $scope.dur = Math.round(dur);
                                                                                           
                                                                                           if ($scope.dur > 0) {
                                                                                           clearInterval($scope.timerDur);
                                                                                           //document.getElementById('audio_duration').innerHTML = ($scope.dur) + " sec";
                                                                                           }
                                                                                           }, 100);
                                                               
                                                               $scope.Timer = $interval(function () {
                                                                                        if (media !== null) {
                                                                                        media.getCurrentPosition(function (position) {
                                                                                                                 $scope.durt = position;
                                                                                                                 if (position > -1) {
                                                                                                                 $scope.setAudioPosition(Math.round(position));
                                                                                                                 console.log(position);
                                                                                                                 return position;
                                                                                                                 }
                                                                                                                 },
                                                                                                                 function (e) {
                                                                                                                 console.log("Error getting pos=" + e);
                                                                                                                 }
                                                                                                                 );
                                                                                        }
                                                                                        }, 1000);
                                                               };
                                                               
                                                               $scope.setAudioPosition = function(position) {
                                                               valP = position;
                                                               var min = Math.floor(valP / 60);
                                                               min = min < 10 ? "0" + min : min;
                                                               var sec = valP % 60;
                                                               sec = sec < 10 ? "0" + sec : sec;
                                                               var time = min + ":" + sec;
                                                               document.getElementById('audio_position').innerHTML = time;
                                                               }
                                                               
                                                               $scope.PauseAudio = function () {
                                                               $scope.PlayPause = !$scope.PlayPause;
                                                               if ($scope.play === true) {
                                                               media.pause();
                                                               $scope.play = false;
                                                               }
                                                               else {
                                                               media.play();
                                                               $scope.play = true;
                                                               }
                                                               };
                                                               
                                                               $scope.PlayPrevious = function () {
                                                               $scope.play = false;
                                                               $scope.PlayAudio($scope.Previous.url,$scope.Previous.name ,$scope.PreviousIndex);
                                                               };
                                                               
                                                               
                                                               $scope.PlayNext = function () {
                                                               $scope.play = false;
                                                               $scope.PlayAudio($scope.Next.url,$scope.Next.name, $scope.NextIndex);
                                                               };
                                                               
                                                               $scope.stopAudio = function () {
                                                               if (media) {
                                                               media.stop();
                                                               $scope.play = false;
                                                               }
                                                               media = null;
                                                               };
                                                               
                                                               //    $scope.RedirectAudio = function(url){
                                                               //        AudioPlayService.setAudioURL(url);
                                                               //        $rootScope.AudioPlayURL = url;
                                                               //        $state.go('menu.audioPlayLast');
                                                               //        };
                                                               $scope.$on('$ionicView.beforeLeave', function () {
                                                                          if(media){
                                                                          media.stop();
                                                                          media.release();
                                                                          $scope.play = false;
                                                                          $scope.url = '';
                                                                          }
                                                                          });
                                                               
                                                               $rootScope.IsNew = function (date) {
                                                               var tempDate = new Date();
                                                               var Created_Date = new Date(date);
                                                               tempDate.setDate(tempDate.getDate() - 7);
                                                               return (Created_Date >= tempDate) ? true : false;
                                                               };
                                                               
                                                               
                                                               
                                                               $scope.socialShare = function () {
                                                               window.plugins.socialsharing.share('Audio file: ' + $rootScope.AudioPlayURL  + '\n\n\n '+"To download the App Click on "+ "\n  http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX", 'Paramhamsa Vani', null, '\n\n' + 'To download the App Click on ' + "  http://itunes.apple.com/us/app/APPNAME/idXXXXXXXXX", function (errormsg) { //alert("Error: Cannot Share");
                                                                                                  });
                                                               };
                                                               
                                                               
                                                               $scope.downloadFile = function () {
                                                               $scope.progressbar = true;
                                                               //var url = encodeURI($rootScope.AudioPlayURL);
                                                               var url = encodeURI("http://www.sreecgmath.org/krishnacast/audio/kirtan/Baladev_Kirtan.mp3");
                                                               // File name only
                                                               var filename = url.split("/").pop();
                                                               //var filename = Math.random();
                                                               var targetPath = cordova.file.documentsDirectory + filename ;
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
                                                               
                                                               
                                                               }]);
