angular.module('app.controllers', ['ionic', 'ui.rCalendar', 'ngCordova', 'ionic-audio', 'youtube-embed'])
    .controller('initialFormCtrl', ['$scope', '$stateParams', '$window', 'LivePostData',
        function ($scope, $stateParams, $window, LivePostData) {
            $scope.temp = { Name: '', Email: '', Location: '', Country: '', MessageFromSirilaGuruDev: '' };
            $scope.doSomething = function () {

                LivePostData.PostLiveData($scope.temp).then(function (response) {
                    console.log(response.data + " " + response);
                    return response.data;
                });

            };
        }])
    .controller('SearchCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

        $scope.temp = { search: '' };

        $scope.clearSearch = function () {
            $scope.temp.search = '';
        };

    }]);
