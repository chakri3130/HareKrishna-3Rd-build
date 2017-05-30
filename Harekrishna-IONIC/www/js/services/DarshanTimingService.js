angular.module('app.services').factory('darshanTiming', function ($http) {
    return {
        getdarshanTiming: function () {
            return $http.get('https://harekrishna.tecnics.com/scgm/service.svc/darshan_timings').then(function (response) {
                return response.data.Table;
            });
        }
    };
});