angular.module('app')
        .factory("asyncFactory", asyncFactory);
asyncFactory.$inject = ["$http"];

function asyncFactory($http) {
    var item = {};

    item.asyncData = function (url, callback) {
        $http.get(url).success(function(data){
           callback(data); 
        });
                
    };
}

