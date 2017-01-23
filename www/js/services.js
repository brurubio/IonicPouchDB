angular.module('starter.services', [])

.service('AuthService', function($q, $http, USER_ROLES) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    username = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;

    //if (username == 'admin') {
    //  role = USER_ROLES.admin;
    //}
    //if (username == 'user') {
    //  role = USER_ROLES.public;
    //}

    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var login = function(name, pw) {
    return $q(function(resolve, reject) {
      if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) { // REFAZEEEEER LOGIN
        // Make a request and receive your auth token from your server
        storeUserCredentials(name + '.yourServerToken');
        resolve('Login success.');
      } else {
        reject('Login Failed.');
      }
    });
  };

  var logout = function() {
    destroyUserCredentials();
  };

  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };

  loadUserCredentials();

  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;}
  };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})

.service('PouchService', function($q){
  var PouchService = {};
  var local = new PouchDB('local_db');
  var db = new PouchDB('http://localhost:5984/apph', {skipSetup: true});
  local.sync(db, {live: true, retry: true}).on('error', console.log.bind(console));

  // Inserir documento no banco
  PouchService.addDocument = function(document){
    return local.put(doc).then(function (response) {
      // handle response
    }).catch(function (err) {
      console.log(err);
    });
  };

  // Recuperar um documento do banco - atráves do ID
  PouchService.getDocument = function(id){
    return local.get(id).then(function (response) {
      console.log(response);// handle doc
      return response;
    }).catch(function (err) {
      console.log(err);
    })
  };

  // Recuperar todos os documentos do banco
  PouchService.getAllDocuments = function(){
    return local.allDocs({include_docs:true}).then(function (response) {
      return response;// handle response
    }).catch(function (err) {
      console.log(err);
    });
  };

  // Remover documento do banco por ID
  PouchService.removeDocument = function(id){
    return local.get(id).then(function (response) {
      local.remove(response);// handle response
    }).catch(function (err) {
      console.log(err);
    });
  };

  // Verifica dados para Login
  PouchService.logIn = function(document){
    var deferred = $q.defer();
    local.get(document._id).then(function(doc) {
      console.log(doc);
      console.log(document);
      if (document.password == doc.pswd){
        console.log('Usuario correto');
      } else {
        cosole.log('Usuario e/ou senha incorretos');
      }
      deferred.resolve(doc);
    }).catch(function (err) {
      console.log('Usuario não existe');
      deferred.reject(err);
    });
    return deferred.promise;
    };
    return PouchService;
  });
