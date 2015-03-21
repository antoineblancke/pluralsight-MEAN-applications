'use-strict';
angular.module('app').factory('appUser', function($resource){
    var userResource = $resource('/api/users/:id', {_id:"@id"});

    userResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return userResource;
});