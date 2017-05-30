angular.module('app.controllers').controller('contactUsCtrl', ['$scope', '$stateParams', 'cus', '$ionicPopup', '$ionicLoading',
                                                               function ($scope, $stateParams, cus, $ionicPopup, $ionicLoading) {
                                                               
                                                               if (window.Connection) {
                                                               if (navigator.connection.type == Connection.NONE) {
                                                               $ionicPopup.confirm({
                                                                                   title: 'No Internet Connection',
                                                                                   content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
                                                                                   })
                                                               .then(function (result) {
                                                                     if (!result) {
                                                                     navigator.app.exitApp();
                                                                     }
                                                                     });
                                                               }
                                                               }
                                                               
                                                               $scope.show = function () {
                                                               $ionicLoading.show({
                                                                                  template: '<ion-spinner></ion-spinner><p>Loading...</p>'
                                                                                  });
                                                               };
                                                               
                                                               $scope.hide = function () {
                                                               $ionicLoading.hide();
                                                               };
                                                               
                                                               cus.getData().then(function (data) {
                                                                                  $scope.show($ionicLoading);
                                                                                  $scope.Address = data[0].Address.toString();
                                                                                  $scope.AddressArray = [];
                                                                                  $scope.AddressArray = $scope.Address.split(",");
                                                                                  $scope.Phone_Number = data[0].Phone_Num;
                                                                                  $scope.Phone_Num = "tel:" + data[0].Phone_Num;
                                                                                  $scope.Feedback = 'mailto:' + data[0].Feedback + '?subject=' + Constants.Paramhamsa_Vani;
                                                                                  $scope.Website_URL = 'http://' + data[0].Website_URL;
                                                                                  $scope.Branches_URL = 'http://' + data[0].Branches_URL;
                                                                                  $scope.hide($ionicLoading);
                                                                                  });
                                                               
                                                               // myFunction = function (str) {
                                                               //   var res = str.split(",");
                                                               //   result = "";
                                                               //   for (var i = 0; i < res.length; i++) {
                                                               //     result = (i > 0) ? (result + "\n" + res[i]) : res[i];
                                                               //   }
                                                               //   return result;
                                                               // }
                                                               
                                                               $scope.openWsite = function () {
                                                               window.open($scope.Website_URL, '_blank', 'location=yes');
                                                               return false;
                                                               };
                                                               
                                                               $scope.showBranches = function () {
                                                               window.open($scope.Branches_URL, '_blank', 'location=yes');
                                                               return false;
                                                               };
                                                               $scope.Email_Us = function () {
                                                               window.open($scope.Feedback, '_system');
                                                               };
                                                               
                                                               $scope.CallNow = function () {
                                                               window.open($scope.Phone_Num, '_system');
                                                               };
                                                               }]);
