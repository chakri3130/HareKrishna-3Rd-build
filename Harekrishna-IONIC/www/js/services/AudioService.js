angular.module('app.services').factory('AudioService', function ($http) {
    return {
        getAudioData : function(url){
         return $http.get(url);   
        }
    };
})