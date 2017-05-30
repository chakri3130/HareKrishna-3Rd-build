angular.module('app.services').factory('pod', function ($http) {
    var dataSource = 'https://harekrishna.tecnics.com/scgm/service.svc/pod';
    var data = [];

    return {
        getData: function () {
            return $http.get(dataSource).then(function (response) {
                data = response;
                console.log("sod :", data.data.Table);
                return data.data.Table;
            });
        }
    };
})