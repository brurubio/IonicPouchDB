angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngMockE2E'])

.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider
  //Página de Login - Geral
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  //Páginas para SuperUsuario
  .state('mainSU', {
    url: '/main',
    abstract: true,
    templateUrl: 'templates/SU/menu.html',
    controller: 'MainSUCtrl'
  })
  .state('mainSU.modulo', {
    url: '/modulo',
    views: {
      'menuContent': {
        templateUrl: 'templates/SU/modulo.html',
        controller: 'ModeSUCtrl'
      }
    }
  })
  .state('mainSU.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/SU/home.html',
        controller: 'HomeSUCtrl'
      }
    }
  })
  .state('mainSU.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/SU/register.html',
        controller: 'RegisterCtrl'
      }
    }
  })
  // .state('register', {
  //   url: '/register',
  //   templateUrl: 'templates/register.html',
  //   controller: 'RegisterCtrl'
  // })
  // Páginas para Setores
  .state('mainSet', {
    url: '/main',
    abstract: true,
    templateUrl: 'templates/Set/menu.html',
    controller: 'MainSetCtrl'
  })
  .state('mainSet.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/Set/home.html',
        controller: 'HomeSetCtrl'
      }
    }
  })
  .state('mainCoord', {
    url: '/main',
    abstract: true,
    templateUrl: 'templates/Coord/menu.html',
    controller: 'MainCoordCtrl'
  })
  .state('mainCoord.modulo', {
    url: '/modulo',
    views: {
      'menuContent': {
        templateUrl: 'templates/Coord/modulo.html',
        controller: 'ModeCoordCtrl'
      }
    }
  })
  .state('mainCoord.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/Coord/home.html',
        controller: 'HomeCoordCtrl'
      }
    }
  });
  // .state('main.home', {
  //   url: '/home',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/home.html'
  //     }
  //   }
  //   //data: {
  //   //  authorizedRoles: [USER_ROLES.admin]
  //   //}
  // });

  // Thanks to Ben Noblet!
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("login");
  });
})

.run(function($httpBackend){
  $httpBackend.whenGET('http://localhost:8100/valid')
        .respond({message: 'This is my valid response!'});
  $httpBackend.whenGET('http://localhost:8100/notauthenticated')
        .respond(401, {message: "Not Authenticated"});
  $httpBackend.whenGET('http://localhost:8100/notauthorized')
        .respond(403, {message: "Not Authorized"});

  $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
 })

.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }

    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'login') {
        //event.preventDefault();
        $state.go('login');
      }
    }
  });
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
