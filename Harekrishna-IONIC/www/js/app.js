angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives', 'app.services', 'ngCordova',])

        .run(function ($ionicPlatform, $ionicSideMenuDelegate, $ionicPopup, $ionicHistory, $state, LivePostData, sod, cal, $rootScope) {

                $ionicPlatform.registerBackButtonAction(function (event) {
                        if ($state.current.name == "menu.home") {
                                //navigator.app.exitApp();
                                var confirmPopup = $ionicPopup.confirm({
                                        title: 'Confirm Exit',
                                        template: "Are you sure you want to close ParamhamsaVani?"
                                });
                                confirmPopup.then(function (close) {
                                        if (close) {
                                                // there is no back view, so close the app instead
                                                navigator.app.exitApp();
                                        } // otherwise do nothing
                                        console.log("User canceled exit.");
                                });
                        }
                        else if ($state.current.name == "menu.liveStreaming") {
                                $state.go("menu.home");
                        }
                        else {
                                navigator.app.backHistory();
                        }
                }, 1000, 200);

                $ionicPlatform.ready(function () {
                        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                                cordova.plugins.Keyboard.disableScroll(true);
                        }


                        if (cordova.plugins.permissions) {
                                var permissions = cordova.plugins.permissions;
                                if (ionic.Platform.platform() == 'android') {

                                        permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, checkPermissionCallback, null);

                                        function checkPermissionCallback(status) {
                                                if (!status.hasPermission) {
                                                        var errorCallback = function () {
                                                                console.warn(' permission is not turned on');
                                                        }

                                                        permissions.requestPermission(
                                                                permissions.WRITE_EXTERNAL_STORAGE,
                                                                function (status) {
                                                                        if (!status.hasPermission) errorCallback();
                                                                },
                                                                errorCallback);
                                                }
                                        }
                                }
                        }

                        /*if (window.Connection) {
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
                        }*/

                        if (window.StatusBar) {
                                StatusBar.styleDefault();
                        }

                        if (typeof analytics !== 'undefined') {
                                Logger.debug(typeof analytics);
                                analytics.startTrackerWithId("UA-89038034-1");
                        } else {
                                console.log("Google Analytics Unavailable");
                        }


                        document.addEventListener("deviceready", onDeviceReady, false);
                        function onDeviceReady() {
                                screen.lockOrientation('portrait');

                                cordova.plugins.notification.local.on("click", function (notification) {
                                        if (notification.id == 1) {
                                                $rootScope.Notification = "SOD";
                                                $state.go('menu.divineSaying');
                                        }
                                });

                                cordova.plugins.notification.local.on("click", function (notification) {
                                        if (notification.id == 2) {
                                                $rootScope.Notification = "Event";
                                                $state.go('menu.notifications');
                                        }
                                });
                        }

                        var applaunchCount = window.localStorage.getItem('launchCount');
                        if (applaunchCount) {
                                console.log("Device is already registered to the push notification server");
                        } else {
                                PDate = new Date(2017, 0, 2).toISOString();
                                window.localStorage.setItem('TodayDate', PDate);

                                var push = PushNotification.init({
                                        android: {
                                                senderID: "530443377363",
                                                sound: true,
                                                icon: 'icon'

                                        },
                                        browser: {
                                                pushServiceURL: 'http://push.api.phonegap.com/v1/push'
                                        },
                                        ios: {
                                                alert: "true",
                                                badge: "true",
                                                sound: "true"
                                        },
                                        windows: {}
                                });

                                push.on('registration', function (data) {
                                        console.log(data);
                                        console.log(data.registrationId);

                                        // updating to device registered code to the server
                                        if (data != null && (data.registrationId != undefined && data.registrationId != 'undefined')) {

                                                deviceRegistrationJSON = {
                                                        "deviceid": window.device.uuid,
                                                        "devicetoken": data.registrationId,
                                                        "devicetype": window.device.platform
                                                };

                                                Logger.debug("Platform is: " + window.device.platform);
                                                Logger.debug("Device Details " + JSON.stringify(deviceRegistrationJSON));

                                                LivePostData.PostDeviceToken(deviceRegistrationJSON).then(
                                                        function (response) {
                                                                result = response.data.Table;
                                                                window.localStorage.setItem('launchCount', 1);
                                                                //alert(response.data.Table[0].Status)
                                                                // if (result !== 'success') {
                                                                //   window.localStorage.setItem('launchCount', 0);
                                                                // }
                                                        },
                                                        function (err) {
                                                                //alert("error block");
                                                                //alert(JSON.stringify(err));
                                                        });
                                        } else {
                                                //alert(JSON.stringify(data));
                                        }
                                });
                                push.on('notification', function (data) {
                                        console.log(data);
                                        data.image = 'icon.png';
                                        data.sound = 'skyline.mp3';
                                        Logger.alert(data.message + "," + data.title);
                                        navigator.notification.beep(1);
                                        navigator.vibrate(100);
                                });

                                push.on('error', function (e) {
                                        Logger.alert("Error: " + e.message);
                                });
                        }

                        var applaunchCount = window.localStorage.getItem('launchCount');
                        var currentDate = new Date().toISOString();
                        console.log(currentDate);
                        var Tdate = window.localStorage.getItem('TodayDate');
                        var Posts = [];
                        if (currentDate.substring(0, 10) !== Tdate.substring(0, 10)) {

                                sod.getData().then(function (data) {
                                        sodEng = data[0].English_Saying;
                                        sodHin = data[0].Hindi_Saying;
                                        divineSaying = sodEng;
                                        monday_8_am = new Date();
                                        d = new Date();
                                        d.setHours(9, 0, 0, 0);
                                        cordova.plugins.notification.local.schedule([{
                                                id: 1,
                                                title: "Praramhamsa Vani",
                                                text: divineSaying,
                                                at: d,
                                                every: "day",
                                                icon: 'file://platforms/android/res/drawable-ldpi/icon.png',
                                                sound: 'res://platform_default'
                                        },
                                        ]);
                                        window.localStorage.setItem('TodayDate', currentDate);
                                })

                                cordova.plugins.notification.local.on("click", function (notification) {
                                        if (notification.id == 1) {
                                                $rootScope.Notification = "SOD";
                                                $state.go('menu.divineSaying');
                                        }
                                });

                                d = new Date();
                                y = new Date().getFullYear();
                                m = new Date().getMonth() + 1;
                                cal.getData(y, m).then(function (data) {
                                        events = data;
                                        now = new Date();
                                        now.setDate(now.getDate() + 1);
                                        for (var i = 0; i < events.length; i++) {
                                                if (events[i].startTime < now && events[i].endTime > now) {
                                                        Title = events[i].title;
                                                        var d = new Date();
                                                        d.setHours(20, 0, 0, 0);
                                                        //d.setDate(d.getDate()-1);
                                                        cordova.plugins.notification.local.schedule([{
                                                                id: 2,
                                                                title: "Praramhamsa Vani",
                                                                text: Title,
                                                                at: d,
                                                                every: "day",
                                                                icon: 'file://platforms/android/res/drawable-ldpi/icon.png',
                                                                sound: 'res://platform_default'
                                                        },
                                                        ]);

                                                        cordova.plugins.notification.local.on("click", function (notification) {
                                                                if (notification.id == 2) {
                                                                        $rootScope.Notification = "Event";
                                                                        $state.go('menu.notifications');
                                                                }
                                                        });
                                                }
                                        }
                                })
                        }
                });
        })

        .config(function ($sceDelegateProvider) {
                $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
                $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http?):\/\/(w{3}.)?sreecgmath\.org/.+$')]);
                // $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://www.youtube.com/dasika051/live']);
        });


