angular.module('app.services').factory('NotificationsService', function ($http) {
    var dataSource = 'https://harekrishna.tecnics.com/scgm/service.svc/Notifications';
    var data = [];

    return {
      getRecentNotifications: function () {
            return $http.get(dataSource).then(function (response) {
                data = response;
                console.log("aod :", response.data.Table);
                return response.data.Table;
            });
        }
    };
})