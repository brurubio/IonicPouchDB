angular.module('starter.controllers', [])

//Redirect to RegisterPage
.controller('LoginCtrl', function($scope, $state) {
})

//Redirect to RegisterPage
.controller('SignupCtrl', function($scope, $state) {
  $scope.registerPage = function() {
    $state.go('register');
  };
})

.controller('userCtrl', function($scope, User, userFactory) {
  //cadastro dois registros
  var nm = $user.name;
  var us = $user.username;
  var ps = $user.password;
  var tu = $user.usertype;
  userFactory.insert(nm, us, ps, tu);
});
