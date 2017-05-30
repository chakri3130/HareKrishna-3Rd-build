angular.module('app.services', []).factory('cus', function ($http) {
  var dataSource = 'https://harekrishna.tecnics.com/scgm/service.svc/contact_us';
  var data = [];

  return {
    getData: function () {
      return $http.get(dataSource).then(function (response) {
        data = response;
        console.log("cus :", data.data.Table);
        return data.data.Table;
      });
    }
  };
});









