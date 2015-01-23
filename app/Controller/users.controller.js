angular.module('app')
        .controller('usersController', usersController);
angular.module('app').directive('userItem', function () {
    return{
        restrict: 'E',
        link: function (scope, element) {
            element.on('click', function () {
                console.log('clicked users');
                scope.getUsers();
            });
        },
        template: 'Felhasználók'
    };
});
usersController.$inject = ['$scope', '$http', '$location', 'loadFactory'];

function usersController($scope, $http, $location, loadFactory) {
    var userData = {};
    $scope.getUsers = function () {

        $location.path('/users');
        loadFactory.loadText();
        $http.get('app/Data/users.json')
                .success(function (response, status) {
                    //remove loading...
                    loadFactory.removeText();
                    for (var i in response) {
                        userData[i] = {
                            username: response[i].name,
                            userage: response[i].age,                            
                            userright: response[i].right                            
                        };
                        $scope.users = userData;
                    }

                    console.log('Users ajax success: ' + status);
                }).error(function (response, status, header) {
            console.log(" response-> " + response + " status-> " + status + " header-> " + header);
        });
    };
}