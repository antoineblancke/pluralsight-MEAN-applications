/**
 * Created by antoine on 13/02/15.
 */
'use-strict';
angular.module('app').controller('mainController', function($scope){
    $scope.courses = [
        {name:"C# for sociopaths",featured:true,published:new Date("02/22/2014")},
        {name:"Mean Stack Javascript",featured:false,published:new Date("02/22/2014")},
        {name:"ReactJS",featured:true,published:new Date("02/22/2014")},
        {name:"Flux architecture",featured:false,published:new Date("02/22/2014")},
        {name:"Working effectively with legacy code",featured:true,published:new Date("02/22/2014")},
        {name:"Clean Code",featured:false,published:new Date("02/22/2014")}
    ];
});
