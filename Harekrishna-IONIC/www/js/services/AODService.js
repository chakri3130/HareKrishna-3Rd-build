angular.module('app.services').factory('aod', function ($http) {
    var dataSource = 'https://harekrishna.tecnics.com/scgm/service.svc/aod';
    var data = [];

    return {
        getData: function () {
            return $http.get(dataSource).then(function (response) {
                data = response;
                console.log("aod :", data.data.Table);
                return data.data.Table;
            });
        }
    };
})