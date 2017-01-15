angular.module('starter.controllers', [])

//Controller da Login View
.controller('LoginCtrl', function($scope, $state) {
  //Redirect to RegisterPage
  $scope.registerPage = function() {
    $state.go('register');
  };
  //Redirect to homePage
  $scope.authLogin = function() {
    $state.go('teste');
  };
  
})

//Controller da Register View
.controller('userCreateCtrl', function($scope) {
});
