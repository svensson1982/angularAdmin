angular.module('app')
        .controller('usersController', usersController);
        angular.module('app').directive('userItem', function(){
            return{
                restrict: 'E',
                /*scope:{
                    info:'='
                },*/
                link: function(scope, element){
                    element.on('click', function(){
                        console.log('clicked');
                        scope.getUsers();
                        scope.usersPath();
                    });
                },
                template: 'Felhasználók'
            };
        });
usersController.$inject = ['$scope','$http', '$location', '$document','loadFactory'];

function usersController($scope, $http, $location, $document, loadFactory){
    $scope.usersPath = function(){
        $location.path('/users');
    };
    $scope.users = "";
    $scope.getUsers = function(){
       //Loading... from load.factory 
       loadFactory.loadText();
        $http({
            url:'app/Data/users.json',
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response, status){
            //remove loading...
            loadFactory.removeText();
            $scope.users = response.name;
            for(var i in response){
                    loadFactory.addItem('<div>'+response[i].name+'</div>');
            }            
            console.log('Users ajax success: '+status);
        }).error(function(response,status,header){
            console.log(" response-> "+ response +" status-> "+ status +" header-> "+ header);
        });
    };
}