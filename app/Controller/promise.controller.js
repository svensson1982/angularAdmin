angular.module("app")
        .controller('promiseController', promiseController);
angular.module('app').directive('promiseItem', function () {
    return{
        restrict: 'E',
        link: function (scope) {
            scope.promiseGreeting(); 
            console.log('i promised');
        },
        template: "Promise"
    };
});

promiseController.$inject = ['$scope', '$q', '$timeout', '$location'];


function promiseController($scope, $q, $timeout, $location) {

    var deferred = $q.defer();
    $scope.menuitem = "promiseMenu";

    function asyncGreet(name) {
        var deferred = $q.defer();

        setTimeout(function () {
            deferred.notify('About to greet ' + name + '.');

            if (name) {
                deferred.resolve('Hello, ' + name + '!');
            } else {
                deferred.reject('Greeting ' + name + ' is not allowed.');
            }
        }, 1000);

        return deferred.promise;
    }
    $scope.promiseGreeting = function () {
        $location.path('/promise');
        var promise = asyncGreet('Robin Hood');
        promise.then(function (greeting) {
            //success
            console.log('Success: ' + greeting);
        }, function (reason) {
            //fail
            console.log('Failed: ' + reason);
        }, function (update) {
            //notification
            console.log('Got notification: ' + update);
        });
    };

    $scope.loadData = function () {
        var defer = $q.defer;
        $timeout(function () {
            defer.resolve();
            console.log("loadData");
        }, 2000);
        return defer.promise;
    };

    $scope.prepData = function () {
        var defer = $q.defer;
        $timeout(function () {
            defer.resolve();
            console.log("prepData");
        }, 2000);
        return defer.promise;
    };

}