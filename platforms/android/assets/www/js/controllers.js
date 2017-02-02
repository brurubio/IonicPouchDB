angular.module('starter.controllers', [])

// Controller da Index Page
.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username();

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
})

// Controller da Login View
.controller('LoginCtrl', function($scope, $state, $ionicPopup, PouchService, AuthService) {

  // $scope.data = {};
  // //Redirect to mainPage
  $scope.authLogin = function(data) {

    AuthService.login(data.username, data.password).then(function(authenticated) { //REFAZER LOGIN
      $state.go('mainSU.modulo', {}, {reload: true});
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
    // PouchService.getDocument("userSUbrurubio").then(function(doc){
    //   console.log(doc.name);
    // })
    // PouchService.getAllDocuments().then(function(doc){
    //   console.log(doc);
    //   console.log(doc.rows);
    //   console.log(doc.rows[2].doc.name);
    // })
  };

  //Redirect to RegisterPage
  $scope.registerPage = function(){
    $state.go('mainSU.register');
  };
})

// Controller da Register View
.controller('RegisterCtrl', function($scope, $state, $ionicPopup, PouchService) {

  $scope.user = {};
  //Get usertype
  var myPopup = $ionicPopup.show({
  template: '<input type="text" ng-model="user.usertype">',
  title: 'Enter the user type',
  // subTitle: 'Please use normal things',
  scope: $scope,
  buttons: [
    { text: 'Cancel' },
    {
      text: '<b>Save</b>',
      type: 'button-positive',
      onTap: function(e) {
        if (!$scope.user.usertype) {
          //don't allow the user to close unless he enters wifi password
          e.preventDefault();
        } else {
          return $scope.user.usertype; // FAZER VALIDAÇAO DO DADO
        }
      }
    }
  ]
});

  //Register Function
  $scope.signUp = function (){
    if ($scope.user.usertype == 1){
        $scope.user._id = 'userSet'+$scope.user.username;
    } else if ($scope.user.usertype == 2){
       $scope.user._id = 'userSU'+$scope.user.username;
    } else if ($scope.user.usertype == 3){
       $scope.user._id = 'userMKT'+$scope.user.username;
    }
    $scope.user.type = 'user';
    PouchService.addDocument($scope.user).then(function(){
      //console.log(docs);
      $state.go('login');
    });
    //PouchService.getDocument('').then(function(docs){console.log(docs);});
    //PouchService.getAllDocuments().then(function(docs){console.log(docs);});
    //PouchService.removeDocument('').then(function(docs){console.log(docs);});
  };
})

// Controller da MainMenu
.controller('MainCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
})

// Controller da Mode View
.controller('ModeCtrl', function($scope, $state, PouchService) {
  $scope.redirecTo = function (){
    $state.go('main.home');
  };
})
// Controllers da SU
.controller('MainSUCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
})

.controller('ModeSUCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.redirecTo = function (){
    $state.go('mainSU.home');
  };
})

.controller('HomeSUCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
})

.controller('MainSetCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
})
.controller('HomeSetCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
})

.controller('MainCoordCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
})
.controller('ModeCoordCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
})
.controller('HomeCoordCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
});
