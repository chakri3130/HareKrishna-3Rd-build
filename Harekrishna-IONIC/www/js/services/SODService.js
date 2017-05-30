angular.module('app.services').factory('sod', function ($http) {
    var dataSource = 'https://harekrishna.tecnics.com/scgm/service.svc/sod';
    var data = [];

    return {
        getData: function () {
            return $http.get(dataSource).then(function (response) {
                data = response;
                console.log("sod :", data.data.Table);
                return data.data.Table;
            });
        },
        getTemplateData: function () {
            return $http.get('https://harekrishna.tecnics.com/scgm/service.svc/templates').then(function (response) {
                return response.data.Table;
            });
        }
    };
});