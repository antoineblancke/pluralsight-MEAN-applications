'use-strict';
angular.module('app').controller('loginController', function($scope, $http, $location, identity, notifier, authService){
    $scope.identity = identity;
    $scope.signIn = function(username, password){
        authService.authenticateUser(username, password).then(function(success){
            if(success){
                notifier.success('You have successfully signed in !');
            } else {
                notifier.notify('Username or password are incorrect !');
            }
        });
    };
    $scope.signOut = function(){
        authService.logOutUser().then(function(){
            $scope.username = "";
            $scope.password = "";
            notifier.success("You have successfully signed out !");
            $location.path('/');
        });
    };
});