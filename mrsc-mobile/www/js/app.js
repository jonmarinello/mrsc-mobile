// Ionic MRSC App
angular.module('mrsc', ['ionic', 'mrsc.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.services', {
      url: '/services',
      views: {
        'tab-services': {
          templateUrl: 'templates/tab-services.html',
          controller: 'ServicesCtrl'
        }
      }
    })

  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/tab-about.html',
        controller: 'AboutCtrl'
      }
    }
  })

  .state('tab.portfolio', {
    url: '/portfolio',
    views: {
      'tab-portfolio': {
        templateUrl: 'templates/tab-portfolio.html',
        controller: 'PortfolioCtrl'
      }
    }
  })

  .state('tab.contact', {
    url: '/contact',
    views: {
      'tab-contact': {
        templateUrl: 'templates/tab-contact.html',
        controller: 'ContactCtrl'
      }
    }
  })

  .state('tab.start-a-project', {
    url: '/start-a-project',
    views: {
      'tab-start-a-project': {
        templateUrl: 'templates/tab-start-a-project.html',
        controller: 'StartAProjectCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
