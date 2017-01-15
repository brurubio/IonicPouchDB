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
.controller('RegisterCtrl', function($scope) {
  var form = document.getElementById('RegForm');
  
  $scope.signUp = function (){
    var user = {};

    user.name = form.uname.value;
    user.username = form.uusername.value;
    user.password = form.upswd.value;
    //user.usertype = form.uusertype.value;
    
    if (form.uusertype.value == 1){
        user.id = 'userSet001';
    } else if (form.uusertype.value == 2){
       user.id = 'userSU'+user.name;
    } else if (form.uusertype.value == 3){
       user.id = 'userMKT'+user.name;
    } 
    console.log(user.id);
    console.log(user.name);
    console.log(user.username);
  };
});
    
    //$scope.signUp = function (){
    //  db.signup('robin', 'dickgrayson', {
    //    metadata : {
    //      email : 'robin@boywonder.com',
    //      birthday : '1932-03-27T00:00:00.000Z',
    //      likes : ['acrobatics', 'short pants', 'sidekickin\''],
    //    }
    //  }, function (err) {
    //    if (err) {
    //      if (err.name === 'conflict') {
    //        // "batman" already exists, choose another username
    //      } else if (err.name === 'forbidden') {
    //        // invalid username
    //      } else {
    //        // HTTP error, cosmic rays, etc.
    //      }
    //    } else {
    //       console.log("Usuário Criado com Sucesso");
    //       $state.go('teste');
    //    }
    //  });
    //};
//});
