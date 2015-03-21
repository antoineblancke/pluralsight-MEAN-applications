/**
 * Created by antoine on 20/01/15.
 */
(function(){
    'use-strict';
    angular.module('app', ['ngResource', 'ngRoute']);

    angular.module('app').config(function($routeProvider, $locationProvider){
        var routeRoleChecks = {
            admin: {
                auth: function(authService){
                    return authService.authorizeCurrentUserForRoutes('admin');
                }
            }
        };

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', { templateUrl: '/partials/main/main', controller: 'mainController'})
            .when('/admin/users', { templateUrl: '/partials/admin/user-list',
                controller: 'userListController',
                resolve: routeRoleChecks.admin
            });
    });

    angular.module('app').run(function($rootScope, $location){
       $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
           if(rejection === 'not authorized'){
               $location.path('/');
           }
       });
    });
})();