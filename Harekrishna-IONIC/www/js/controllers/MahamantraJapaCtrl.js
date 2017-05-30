angular.module('app.controllers').controller('mahamantraJapaCtrl', ['$scope', '$stateParams',
                                                                    function ($scope, $stateParams) {
                                                                    
                                                                    $scope.isPlaying = false;
                                                                    audio = null;
                                                                    $scope.playAudio = function() {
                                                                    if(audio === null){
                                                                    if(window.device.platform === 'Android')
                                                                    {
                                                                    audio = new Media(encodeURI('/android_asset/www/audio/Harinam.mp3'));
                                                                    }
                                                                    else 
                                                                    {
                                                                    audio = new Media(encodeURI('/audio/Harinam.mp3'));
                                                                    }
                                                                    }
                                                                    if($scope.isPlaying === false)
                                                                    {
                                                                    audio.play({ numberOfLoops: 9 });
                                                                    $scope.isPlaying = true;
                                                                    }
                                                                    else {
                                                                    audio.pause();
                                                                    $scope.isPlaying = false;  
                                                                    }
                                                                    };
                                                                    $scope.$on('$ionicView.beforeLeave', function() {
                                                                               if($scope.isPlaying === true)
                                                                               {  
                                                                               audio.pause(); 
                                                                               $scope.isPlaying = false;
                                                                               }
                                                                               });
                                                                    
                                                                    }]);
