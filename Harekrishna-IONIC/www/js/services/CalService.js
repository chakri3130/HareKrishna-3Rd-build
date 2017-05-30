angular.module('app.services').factory('cal', function ($http) {
                                       var dataSource;
                                       var data = [];
                                       
                                       return {
                                       getData: function (y, m) {
                                       dataSource = 'https://harekrishna.tecnics.com/scgm/service.svc/events/year=' + y + '/month=' + m;
                                       return $http.get(dataSource).then(function (response) {
                                                                         data = response;
                                                                         console.log("cal :", data);
                                                                         var events = [];
                                                                         var calData = data.data.Table;
                                                                         var calLen = calData.length;
                                                                         for (var i = 0; i < calLen; i++) {
                                                                         var data = calData[i];
                                                                         var startTime = new Date(data.startTime);
                                                                         var endTime = new Date(data.endTime);
                                                                         var title = data.title;
                                                                         var dataAllDay = data.allDay;
                                                                         var homeTemplate_URL = data.HomeTemplate_URL;
                                                                         if (dataAllDay == 'true') {
                                                                         var allDay = true;
                                                                         } else {
                                                                         var allDay = false;
                                                                         }
                                                                         events.push({
                                                                                     homeTemplate_URL: homeTemplate_URL,
                                                                                     title: title,
                                                                                     startTime: startTime,
                                                                                     endTime: endTime,
                                                                                     allDay: allDay
                                                                                     });
                                                                         }
                                                                         console.log("event sir:", events);
                                                                         return events;
                                                                         });
                                       },
                                       
                                       getHomeTemplate: function()
                                       {
                                       url = 'https://harekrishna.tecnics.com/scgm/service.svc/hometemplate';
                                       return $http.get(url);
                                       }
                                       };
                                       
                                       });
