angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('menu.home', {
        url: '/page1',
        views: {
          'side-menu21': {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
          }
        }
      })

      .state('menu', {
        url: '/side-menu21',
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      })

      .state('menu.mahamantraJapa', {
        url: '/page4',
        views: {
          'side-menu21': {
            templateUrl: 'templates/mahamantraJapa.html',
            controller: 'mahamantraJapaCtrl'
          }
        }
      })

      .state('menu.InitialForm', {
        url: '/page26',
        views: {
          'side-menu21': {
            templateUrl: 'templates/InitialForm.html',
            controller: 'initialFormCtrl'
          }
        }
      })

      .state('menu.contactUs', {
        url: '/page5',
        views: {
          'side-menu21': {
            templateUrl: 'templates/contactUs.html',
            controller: 'contactUsCtrl'
          }
        }
      })

      .state('menu.vaishnavaCalendar', {
        url: '/page6',
        views: {
          'side-menu21': {
            templateUrl: 'templates/vaishnavaCalendar.html',
            controller: 'vaishnavaCalendarCtrl'
          }
        }
      })

      .state('menu.blog', {
        url: '/page7',
        views: {
          'side-menu21': {
            templateUrl: 'templates/blog.html',
            controller: 'blogCtrl'
          }
        }
      })

      .state('menu.media', {
        url: '/page8',
        views: {
          'side-menu21': {
            templateUrl: 'templates/media.html',
            controller: 'mediaCtrl'
          }
        }
      })

      .state('menu.video', {
        url: '/page9',
        views: {
          'side-menu21': {
            templateUrl: 'templates/video.html',
            controller: 'videoCtrl'
          }
        }
      })

      .state('menu.publications', {
        url: '/page10',
        views: {
          'side-menu21': {
            templateUrl: 'templates/publications.html',
            controller: 'publicationsCtrl'
          }
        }
      })

      .state('menu.liveStreaming', {
        url: '/page19',
        views: {
          'side-menu21': {
            templateUrl: 'templates/liveStreaming.html',
            controller: 'liveStreamingCtrl'
          }
        }
      })

      .state('menu.divineSaying', {
        url: '/page11',
        views: {
          'side-menu21': {
            templateUrl: 'templates/divineSaying.html',
            controller: 'divineSayingCtrl'
          }
        }
      })

      .state('menu.audio', {
        url: '/page13',
        views: {
          'side-menu21': {
            templateUrl: 'templates/audio.html',
            controller: 'audioCtrl'
          }
        }
      })
      .state('menu.pod', {
        url: '/page14',
        views: {
          'side-menu21': {
            templateUrl: 'templates/pod.html',
            controller: 'podCtrl'
          }
        }
      })
      .state('menu.audioPlay', {
        url: '/page23',
        views: {
          'side-menu21': {
            templateUrl: 'templates/audioPlay.html',
            controller: 'audioPlayCtrl'
          }
        }
      })
      .state('menu.aod', {
        url: '/aod',
        views: {
          'side-menu21': {
            templateUrl: 'templates/aod.html',
            controller: 'aodCtrl'
          }
        }
      })
      .state('menu.VideoRedirect', {
        url: '/page24',
        views: {
          'side-menu21': {
            templateUrl: 'templates/VideoRedirect.html',
            controller: 'VideoRedirectCtrl'
          }
        }
      })
      .state('menu.search', {
        url: '/page27',
        views: {
          'side-menu21': {
            templateUrl: 'templates/Search.html',
            controller: 'SearchCtrl'
          }
        }
      }).state('menu.notifications', {
        url: '/notifications',
        views: {
          'side-menu21': {
            templateUrl: 'templates/notifications.html',
            controller: 'NotificationsCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise('/side-menu21/page1');



  });
