angular.module('app.services').factory('LivePostData', function ($http) {
    return {
        PostLiveData: function (data) {
            return $http.post('https://harekrishna.tecnics.com/scgm/service.svc/User_details', {'name' : data.Name, 'email':data.Email ,'location':data.Location,'country':data.Country,'message':data.MessageFromSirilaGuruDev});
        },
        PostLiveViewData: function (data) {
            console.log(JSON.stringify(data));
            return $http.post('https://harekrishna.tecnics.com/scgm/service.svc/User_Viewdetails', data);
        },
        PostDeviceToken: function (deviceJSON) {
            //alert(" Device iD " + deviceid + " Device token " + devicetoken);
            //alert(JSON.stringify(deviceJSON));
            return $http.post('https://harekrishna.tecnics.com/scgm/service.svc/devicetoken', deviceJSON);
        },
        BloggerNotifications: function () {
            return $http.get("https://www.googleapis.com/blogger/v3/blogs/7500329547718522248/posts?key=AIzaSyCqNTuVyGaj4HJRiAo4mhwAQEAt7K7oDAE");
        }
    };
});
