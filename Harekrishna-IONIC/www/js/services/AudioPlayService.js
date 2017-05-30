angular.module('app.services').factory('AudioPlayService', function ($http) {
    var itemData = [];
    return {
        getUrlBasedAudioList: function (url) {
            return $http.get(url);
        },
        setItem: function (data) {
            item = data;
        },
        getItem: function () {
            return item;
        },
        setURL: function (data) {
            itemData = data;
        },
        getURL: function () {
            return itemData;
        },
        setAudioURL: function (data) {
            item = data;
        },
        getAudioURL: function () {
            return item;
        }
    };
});