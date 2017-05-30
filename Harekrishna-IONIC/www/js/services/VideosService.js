angular.module('app.services').factory('VideosServices', function ($http) {
    return {
        getVideoData : function(url){
         return $http.get(url);  
        },
    };
});