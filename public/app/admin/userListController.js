angular.module('app').controller('userListController', function($scope, appUser){
    $scope.users = appUser.query();
});