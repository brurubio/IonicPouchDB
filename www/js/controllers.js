angular.module('starter.controllers', [])

//Controller da Login View
.controller('LoginCtrl', function($scope, $state, PouchService) {
  
  $scope.lin = {};
  //Redirect to RegisterPage
  $scope.registerPage = function() {
    $state.go('register');
  };
  //Redirect to homePage
  $scope.authLogin = function() {
    //console.log($scope.lin);
    $scope.lin._id = 'userSU'+$scope.lin.username;
    PouchService.logIn($scope.lin).then(function(res){
      console.log('Só se der certo');
      $state.go('home');
    });
  };
  
})

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
    PouchService.getAllDocuments().then(function(docs){console.log(docs);});
    //PouchService.removeDocument('').then(function(docs){console.log(docs);});
  };
})
//Controller da Menu View  
.controller('HomeCtrl', function($scope, $state, PouchService) {
  var doc = PouchService.getDocument('userSUbrurubio');
  $state.go('home.modulo');
  //return doc;
})

.controller('ModeCtrl', function($scope, $state, PouchService) {
  
});