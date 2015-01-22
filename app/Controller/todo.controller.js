angular.module('app')
        .controller('todoController', todoController)
        .directive('todoList', function () {
            return{
                restrict: 'EA',
                /*scope: {
                    actionn: "=",
                    completet: "="
                },*/
                link: function (scope, element) {
                    element.on('click', function () {
                        scope.getPath2();
                    });
                },
                template: "Lista"
            };
        });

todoController.$inject = ['$scope', '$location', 'loadFactory'];

function todoController($scope, $location, loadFactory) {
    $scope.getPath2 = function () {
        loadFactory.loadText();
        $location.path('/todo');
        
        $scope.data = {};
        $scope.todos = [
            {action: "Get groceries", complete: false},
            {action: "Call plumber", complete: false},
            {action: "Buy running shoes", complete: true},
            {action: "Buy flowers", complete: false},
            {action: "Call family", complete: false}];
        loadFactory.removeText();
        console.log("todo");
    };
    
        
}