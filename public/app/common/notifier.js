'use-strict';

angular.module('app').value('toastr', toastr);

angular.module('app').factory('notifier', function (toastr){
   return {
       success: function(msg){
           toastr.success(msg);
           console.log(msg);
       },
       notify: function(msg){
           toastr.info(msg);
           console.log(msg);
       }
   };
});
