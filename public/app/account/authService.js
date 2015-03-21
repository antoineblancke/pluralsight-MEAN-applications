'use-strict';
angular.module('app').factory('authService', function($http, identity, $q, appUser){
    return{
        authenticateUser: function(username, password){
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function(response){
                if(response.data.success){
                    var user = new appUser();
                    angular.extend(user, response.data.user);
                    identity.currentUser = user;
                    dfd.resolve(true);
                }else{
                    dfd.resolve(false);
                }
            });

            return dfd.promise;
        },
        logOutUser: function(){
            var dfd = $q.defer();
            $http.post('/logout', {logout:true}).then(function(){
                identity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRoutes: function(role){
            if(identity.isAuthorized(role)){
                return true;
            }else{
                return $q.reject('not authorized');
            }
        }
    };
});