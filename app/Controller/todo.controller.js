angular.module('app')
        .controller('todoController', todoController)
        .directive('todoList', function () {
            return{
                restrict: 'EA',
                link: function (scope, element) {
                    element.on('click', function () {
                        scope.getTodo();
                    });
                },
                template: "Todo"
            };
        });

todoController.$inject = ['$scope', '$location', '$http', 'loadFactory'];

function todoController($scope, $location, $http, loadFactory) {
    $scope.getTodo = function () {
        loadFactory.loadText();
        $location.path('todo');
        
        var todoData = {};
        $scope.data = {};
        $http.get('app/Data/todo.json')
                .success(function(response, status){
            //remove loading...
            loadFactory.removeText();
            for(var i in response){
                todoData[i] = {
                    action: response[i].action,
                    complete:response[i].complete
                };
                    $scope.todos = todoData;
            }            
            console.log('Users ajax success: '+status);
        }).error(function(response,status,header){
            console.log(" response-> "+ response +" status-> "+ status +" header-> "+ header);
        });
        
        //$scope.todos = ;
        loadFactory.removeText();
        console.log("todo");
    };
    
        
}