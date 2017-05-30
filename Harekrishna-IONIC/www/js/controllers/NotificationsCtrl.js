angular.module('app.controllers').controller('NotificationsCtrl', ['$scope', '$sce', 'NotificationsService', 'LivePostData',
                                                                   'AudioService', 'PublicationsService', 'VideosServices', '$state', '$rootScope', 'cal', '$filter',
                                                                   function ($scope, $sce, NotificationsService, LivePostData, AudioService, PublicationsService, VideosServices, $state, $rootScope, cal, $filter) {
                                                                   
                                                                   $rootScope.Notification = "";
                                                                   
                                                                   $scope.getFormattedDate = function (activityDate) {
                                                                   Logger.debug("activityDate " + activityDate);
                                                                   activityDate = new Date(activityDate);
                                                                   var hh = activityDate.getHours();
                                                                   hh = hh > 9 ? hh : '0' + hh;
                                                                   var mm = activityDate.getMinutes();
                                                                   mm = mm > 9 ? mm : '0' + mm;
                                                                   var ss = activityDate.getSeconds();
                                                                   ss = ss > 9 ? ss : '0' + ss;
                                                                   month = activityDate.getMonth() + 1;
                                                                   month = month > 9 ? month : '0' + month;
                                                                   day = activityDate.getDate();
                                                                   day = day > 9 ? day : '0' + day;
                                                                   formattedDate = activityDate.getFullYear() + '/' + month + '/' + day + " " + hh + ":" + mm + ":" + ss;
                                                                   Logger.debug("formattedDate " + formattedDate);
                                                                   return formattedDate;
                                                                   };
                                                                   
                                                                   
                                                                   $scope.$on('$ionicView.enter', function () {
                                                                              //$scope.updateLatestPushNotificationItems($scope.notificationsArray);
                                                                              
                                                                              todayArray = [];
                                                                              if ($scope.notificationsArray.length > 0) {
                                                                              var tody = new Date();
                                                                              for (var k = 0; k < $scope.notificationsArray.length; K++) {
                                                                              if ($scope.notificationsArray[k].Delivery_Time == $scope.getFormattedDate(tody)) {
                                                                              todayArray.push($scope.notificationsArray[i]);
                                                                              }
                                                                              }
                                                                              }
                                                                              
                                                                              var cnt = window.localStorage.getItem('NotificationsCount');
                                                                              if (cnt == null || cnt != 0) {
                                                                              $scope.result = todayArray.length;
                                                                              window.localStorage.setItem('NotificationsCount', todayArray.length);
                                                                              }
                                                                              else {
                                                                              if (todayArray.length > cnt) {
                                                                              $scope.result = todayArray.length - cnt;
                                                                              window.localStorage.setItem('NotificationsCount', todayArray.length);
                                                                              }
                                                                              }
                                                                              });
                                                                   
                                                                   
                                                                   //   loading notifications data
                                                                   $scope.notificationsArray = [];
                                                                   NotificationsService.getRecentNotifications().then(function (response) {
                                                                                                                      $scope.notification = response;
                                                                                                                      for (var i = 0; i < $scope.notification.length; i++) {
                                                                                                                      notif = { 'Delivery_Time ': '', 'Notification': '', Type: 'Push Notification', Image: 'img/icon.png', IsClicked: false };
                                                                                                                      notif.Delivery_Time = $scope.getFormattedDate($scope.notification[i].Delivery_Time);
                                                                                                                      notif.Notification = $scope.notification[i].Notification;
                                                                                                                      //notif.Type = 'Push Notification';
                                                                                                                      $scope.notificationsArray.push(notif);
                                                                                                                      }
                                                                                                                      Logger.debug(response);
                                                                                                                      });
                                                                   
                                                                   //Loading latest blog post
                                                                   LivePostData.BloggerNotifications().then(function (response) {
                                                                                                            Posts = response.data;
                                                                                                            console.log(Posts);
                                                                                                            today = new Date();
                                                                                                            d = new Date();
                                                                                                            df = new Date(d.setDate(d.getDate() - 7)).toISOString();
                                                                                                            for (var i = 0; i < Posts.items.length; i++) {
                                                                                                            if (Posts.items[i].published > df || Posts.items[i].updated > df) {
                                                                                                            notif = { 'Delivery_Time ': '', 'Notification': '', Type: 'Blogger', Image: 'img/blog.png', IsClicked: false };
                                                                                                            notif.Delivery_Time = $scope.getFormattedDate(Posts.items[i].published);
                                                                                                            notif.Notification = Posts.items[i].title;
                                                                                                            $scope.notificationsArray.push(notif);
                                                                                                            }
                                                                                                            }
                                                                                                            })
                                                                   
                                                                   d = new Date();
                                                                   y = new Date().getFullYear();
                                                                   m = new Date().getMonth() + 1;
                                                                   cal.getData(y, m).then(function (data) {
                                                                                          events = data;
                                                                                          now = new Date();
                                                                                          for (var i = 0; i < events.length; i++) {
                                                                                          if (events[i].startTime < now && events[i].endTime > now) {
                                                                                          notif = { 'Delivery_Time ': '', 'Notification': '', Type: 'Events', Image: 'img/icon.png', IsClicked: false };
                                                                                          notif.Delivery_Time = $scope.getFormattedDate(events[i].startTime);
                                                                                          notif.Notification = events[i].title;
                                                                                          $scope.notificationsArray.push(notif);
                                                                                          }
                                                                                          }
                                                                                          });
                                                                   
                                                                   //Check whether the notification is in last 7 days
                                                                   IsNew = function (date) {
                                                                   var tempDate = new Date();
                                                                   var Created_Date = new Date(date);
                                                                   tempDate.setDate(tempDate.getDate() - 7);
                                                                   return (Created_Date >= tempDate) ? true : false;
                                                                   };
                                                                   
                                                                   Languages = ['Hindi', "English", "Bengali"];
                                                                   
                                                                   $scope.Publications = [];
                                                                   for (var j = 0; j < Languages.length; j++) {
                                                                   publication_url = "https://harekrishna.tecnics.com/scgm/service.svc/publications/language=" + Languages[j];
                                                                   PublicationsService.getPublications(publication_url).then(function (response) {
                                                                                                                             $scope.Publications = response.data.Table;
                                                                                                                             for (var i = 0; i < $scope.Publications.length; i++) {
                                                                                                                             if (IsNew($scope.Publications[i].Created_Date)) {
                                                                                                                             notif = { 'Delivery_Time ': '', 'Notification': '', Type: 'Publications', Image: 'img/publications.png', IsClicked: false };
                                                                                                                             notif.Delivery_Time = $scope.getFormattedDate($scope.Publications[i].Created_Date);
                                                                                                                             notif.Notification = $scope.Publications[i].Publication_Name;
                                                                                                                             //notif.Type = 'Publications';
                                                                                                                             $scope.notificationsArray.push(notif);
                                                                                                                             }
                                                                                                                             }
                                                                                                                             });
                                                                   
                                                                   video_url = "https://harekrishna.tecnics.com/scgm/service.svc/Video/language=" + Languages[j];
                                                                   VideosServices.getVideoData(video_url).then(function (response) {
                                                                                                               $scope.Videos = response.data;
                                                                                                               for (var i = 0; i < $scope.Videos.length; i++) {
                                                                                                               for (var j = 0; j < $scope.Videos[i].list.length; j++) {
                                                                                                               if (IsNew($scope.Videos[i].list[j].created_Date)) {
                                                                                                               notif = { 'Delivery_Time ': '', 'Notification': '', Type: 'Video', Image: 'img/video.jpg', IsClicked: false };
                                                                                                               notif.Delivery_Time = $scope.getFormattedDate($scope.Videos[i].list[j].created_Date);
                                                                                                               notif.Notification = $scope.Videos[i].list[j].sTitle;
                                                                                                               //notif.Type = 'Video';
                                                                                                               $scope.notificationsArray.push(notif);
                                                                                                               }
                                                                                                               }
                                                                                                               }
                                                                                                               });
                                                                   
                                                                   audio_url = "https://harekrishna.tecnics.com/scgm/service.svc/Audio/language=" + Languages[j];
                                                                   AudioService.getAudioData(audio_url).then(function (response) {
                                                                                                             $scope.Audios = response.data;
                                                                                                             for (var i = 0; i < $scope.Audios.length; i++) {
                                                                                                             for (var j = 0; j < $scope.Audios[i].list.length; j++) {
                                                                                                             for (var k = 0; k < $scope.Audios[i].list[j].slist.length; k++) {
                                                                                                             if (IsNew($scope.Audios[i].list[j].slist[k].created_Date)) {
                                                                                                             notif = { 'Delivery_Time ': '', 'Notification': '', Type: 'Audio', Image: 'img/audio.png', IsClicked: false };
                                                                                                             notif.Delivery_Time = $scope.getFormattedDate($scope.Audios[i].list[j].slist[k].created_Date);
                                                                                                             notif.Notification = $scope.Audios[i].list[j].slist[k].sTitle;
                                                                                                             //notif.Type = 'Audio';
                                                                                                             $scope.notificationsArray.push(notif);
                                                                                                             }
                                                                                                             }
                                                                                                             }
                                                                                                             }
                                                                                                             });
                                                                   }
                                                                   
                                                                   $scope.Redirect = function (type) {
                                                                   
                                                                   if (type == 'Push Notification') {
                                                                   
                                                                   }
                                                                   else if (type == 'Blogger') {
                                                                   $state.go('menu.blog');
                                                                   }
                                                                   else if (type == 'Publications') {
                                                                   $state.go('menu.publications');
                                                                   }
                                                                   else if (type == 'Audio') {
                                                                   $state.go('menu.audio');
                                                                   }
                                                                   else if (type == 'Video') {
                                                                   $state.go('menu.video');
                                                                   }
                                                                   }
                                                                   
                                                                   
                                                                   }]);






