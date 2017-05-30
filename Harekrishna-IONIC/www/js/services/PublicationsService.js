angular.module('app.services').factory('PublicationsService', function ($http) {
    return {
        getEngPublications: function () {
            return $http.get("https://harekrishna.tecnics.com/scgm/service.svc/publications/language=English");
        },
        getHindiPublications: function () {
            return $http.get("https://harekrishna.tecnics.com/scgm/service.svc/publications/language=Hindi");
        },
        getBengaliPublications: function () {
            return $http.get("https://harekrishna.tecnics.com/scgm/service.svc/publications/language=bengali");
        },
        getPublicationsDefault: function () {
            return $http.get("https://harekrishna.tecnics.com/scgm/service.svc/publications/language=English");
        },
        getPublications: function (url) {
            return $http.get(url);
        }
    };
});