angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'jett.ionic.filter.bar', 'ngMockE2E'])

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
  .state('mainSU.changeUser', {
    url: '/useralt',
    views: {
      'menuContent': {
        templateUrl: 'templates/SU/alterUser.html',
        controller: 'ChangeUserCtrl'
      }
    }
  })
  .state('mainSU.changeUserInfo', {
    url: '/useralt',
    views: {
      'menuContent': {
        templateUrl: 'templates/SU/changeUserInfo.html',
        controller: 'ChangeUserInfoCtrl'
      }
    },
    params: {
      'data' : null
    }
  })
  .state('mainSU.regInstHosp', {
    url: '/newinst',
    views: {
      'menuContent': {
        templateUrl: 'templates/SU/registerHosp.html',
        controller: 'regInstHospCtrl'
      }
    }
  })
  .state('mainSU.regInstPDV', {
    url: '/newinst',
    views: {
      'menuContent': {
        templateUrl: 'templates/SU/registerPDV.html',
        controller: 'regInstPDVCtrl'
      }
    }
  })
  .state('mainSU.regInstONG', {
    url: '/newinst',
    views: {
      'menuContent': {
        templateUrl: 'templates/SU/registerONG.html',
        controller: 'regInstONGCtrl'
      }
    }
  })
  .state('mainSU.regInstILP', {
    url: '/newinst',
    views: {
      'menuContent': {
        templateUrl: 'templates/SU/registerILP.html',
        controller: 'regInstILPCtrl'
      }
    }
  })
  .state('mainSU.regInstOP', {
    url: '/newinst',
    views: {
      'menuContent': {
        templateUrl: 'templates/SU/registerOP.html',
        controller: 'regInstOPCtrl'
      }
    }
  })
  .state('mainSU.regInstCLT', {
    url: '/newinst',
    views: {
      'menuContent': {
        templateUrl: 'templates/SU/registerCLT.html',
        controller: 'regInstCLTCtrl'
      }
    }
  })
  .state('mainSU.changeInst', {
    url: '/instalt',
    views: {
      'menuContent': {
        templateUrl: 'templates/SU/alterInst.html',
        controller: 'ChangeInstCtrl'
      }
    }
  })
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
  })
  .state('mainMKT', {
    url: '/main',
    abstract: true,
    templateUrl: 'templates/MKT/menu.html',
    controller: 'MainMKTCtrl'
  })
  .state('mainMKT.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/MKT/home.html',
        controller: 'HomeMKTCtrl'
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
