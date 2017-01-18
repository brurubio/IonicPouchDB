// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])


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
    //var PouchDB = require("pouchdb");
    //PouchDB.plugin(require('pouchdb-authentication'));    
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: 'templates/login.html'
  })
    .state('teste', {
      url: '/teste',
      templateUrl: 'templates/teste.html'
  })    
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register.html',
      controller: 'RegisterCtrl'
  })
    .state('home', {
      url: '/home',
      //abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'HomeCtrl'
  })
    .state('home.modulo', {
    url: '/modulo',
    views: {
      'menuContent': {
        templateUrl: 'templates/modulo.html',
        controller: 'ModeCtrl'
      }
    }
  })
  .state('home.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('home.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('home.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          //controller: 'PlaylistsCtrl'
        }
      }
    })
  .state('home.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
       // controller: 'PlaylistCtrl'
      }
    }
  });
  // If none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});