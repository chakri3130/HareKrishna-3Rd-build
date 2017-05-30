angular.module('app.services')
    .factory('locbData', function ($http) {
        var dataSource = 'https://harekrishna.tecnics.com/SCGM/service.svc/url';
        var data = [];

        return {
            getData: function () {
                return $http.get(dataSource).then(function (response) {
                    data = response;
                    console.log(data.data.Table);
                    return data.data.Table;
                });
            }
        };
    });