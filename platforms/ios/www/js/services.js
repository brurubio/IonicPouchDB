angular.module('starter.services', [])
    .service('PouchService', function($q){
       var PouchService = {};
       var local = new PouchDB('local_db');
       var db = new PouchDB('http://localhost:5984/apph', {skipSetup: true});
       local.sync(db, {live: true, retry: true}).on('error', console.log.bind(console));
       
       PouchService.addDocument = function(document){
            return local.put(document);
       };
       
       PouchService.getDocument = function(id){
         var deferred = $q.defer();
         local.get(id).then(function(doc) {
            deferred.resolve(doc);
          }).catch(function (err) {
            deferred.reject(err);
          });

         return deferred.promise;
       };
       
       PouchService.getAllDocuments = function(){
         var deferred = $q.defer();
         local.allDocs({include_docs: true}).then(function(docs) {
            deferred.resolve(docs);
          }).catch(function (err) {
            deferred.reject(err);
          });
         return deferred.promise;        
       };
       
       PouchService.removeDocument = function(id){
         var deferred = $q.defer();
         local.get(id).then(function(docs) {
            local.remove(docs);
            return  deferred.resolve(docs);
          }).catch(function (err) {
            deferred.reject(err);
          });
         return deferred.promise;        
       };
       
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