var db = null;
var sqlite = angular.module('sqlite', ['ionic', 'ngCordova']);

sqlite.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    db = $cordovaSQLite.openDB("my.db");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS user (id integer primary key, name varchar(40), username text, pswd password, usertype text)");
  });
});

sqlite.factory('userFactory', function($cordovaSQLite) {
  return {
    insert : function(name, username, pswd, usertype) {
      var query = "INSERT INTO user (name, username, pswd, usertype) VALUES (?, ?, ?, ?);";      
      var values = [name, username, pswd, usertype];

      $cordovaSQLite.execute(db, query, values).then(
        function(res) {
          console.log('User Insert Success ' + res.insertID);
        },
        function(err) {
          console.log('ERROR: '+err);
        }
      );
    }
  };
});