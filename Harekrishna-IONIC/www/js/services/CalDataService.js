angular.module('app.services').factory('CalData', function ($http) {
    var dataSource;
    var data = [];

    return {
        getCalData: function (m, y) {
            dataSource = 'https://harekrishna.tecnics.com/scgm/service.svc/events/val1=' + y + '/val2=' + m;
            return $http.get(dataSource).then(function (response) {
                data = response;
                console.log(data.data.Table);
                return data.data.Table;
            });
        }
    };

});