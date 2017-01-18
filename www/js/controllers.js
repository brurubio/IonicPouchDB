angular.module('starter.controllers', [])
//Controller Index Page
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

//Controller da Login View
.controller('LoginCtrl', function($scope, $state, $ionicPopup, PouchService, AuthService) {
  $scope.data = {};
  //Redirect to mainPage
  $scope.authLogin = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) { //REFAZER LOGIN
      $state.go('main.modulo', {}, {reload: true});
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
  
  //Redirect to RegisterPage
  $scope.registerPage = function() {
    $state.go('register');
  };
})  
  //Redirect to mainPage
  //$scope.authLogin = function() {
  //  //console.log($scope.lin);
  //  $scope.lin._id = 'userSU'+$scope.lin.username;
  //  PouchService.logIn($scope.lin).then(function(res){
  //    console.log('Só se der certo');
  //    $state.go('main.modulo');
  //  });
  //};


//Controller da Register View
.controller('RegisterCtrl', function($scope, $state, PouchService) {
  
  $scope.user = {};
  
  //Register Function
  $scope.signUp = function (){
    
    if ($scope.user.usertype == 1){
        $scope.user._id = 'userSet'+$scope.user.username;
    } else if ($scope.user.usertype == 2){
       $scope.user._id = 'userSU'+$scope.user.username;
    } else if ($scope.user.usertype == 3){
       $scope.user._id = 'userMKT'+$scope.user.username;
    }
    PouchService.addDocument($scope.user).then(function(){
      //console.log(docs);
      $state.go('login');
    });
    //PouchService.getDocument('').then(function(docs){console.log(docs);});
    //PouchService.getAllDocuments().then(function(docs){console.log(docs);});
    //PouchService.removeDocument('').then(function(docs){console.log(docs);});
  };
})

//Controller da MainMenu
.controller('MainCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
})
////Controller da Menu View  
//.controller('HomeCtrl', function($scope, $state, PouchService) {
//  var doc = PouchService.getDocument('userSUbrurubio');
//  $state.go('home.modulo');
//  //return doc;
//})
//
.controller('ModeCtrl', function($scope, $state, PouchService) {
  $scope.redirecTo = function (){
    $state.go('main.home');
  }
  });