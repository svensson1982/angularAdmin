angular.amodule('app')
        .directive('menuItem', function () {
            return{
                restrict: 'E',
                scope: {
                    menuInfo: '=info'
                },
                templateUrl: 'app/Template/users.html'
            };
        });