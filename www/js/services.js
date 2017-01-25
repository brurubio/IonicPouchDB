angular.module('starter.services', [])

.service('AuthService', function($q, $http, PouchService, USER_ROLES) {
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
      PouchService.getDocumentbyUsername(name).then(function(doc){
        console.log(doc);
        console.log(doc.rows);
        // console.log(doc.rows[0].doc.pswd);
        if (Object.keys(doc.rows).length == 0){
          reject('Login Failed.');
        } else {
          if (pw == doc.rows[0].doc.pswd){
                 storeUserCredentials(name + '.yourServerToken');
                 resolve('Login success.');
         }
        }
        // for (i = 0; i < Object.keys(doc.rows).length; i++) {
        //   if (name == doc.rows[i].doc.username){
        //     if (pw == doc.rows[i].doc.pswd){
        //       storeUserCredentials(name + '.yourServerToken');
        //       resolve('Login success.');
        //     }
        //   }
        // }
        //reject('Login Failed.');
      })
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
    return local.put(document).then(function (response) {
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
  PouchService.getDocumentbyType = function(){
    return local.query(function (doc, emit) {
      emit(doc.type);
    }, {key: 'user', include_docs: true}).then(function (result) {
       return result;// retorna todos os documentos cujo valor da propriedade "type" é igual a "pessoa"
    }).catch(function (err) {
      console.log(err);
    })
  };

  PouchService.getDocumentbyUsername = function(username){
    return local.query(function (doc, emit) {
      emit(doc.username);
    }, {key: username, include_docs: true}).then(function (result) {
       return result;// retorna todos os documentos cujo valor da propriedade "type" é igual a "pessoa"
    }).catch(function (err) {
      console.log(err);//return err;
    })
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
