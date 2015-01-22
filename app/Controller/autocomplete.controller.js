angular.module('app')
        .controller('autocompleteController',autocompleteController);

autocompleteController.$inject = ["$scope","$http"];

function autocompleteController($scope,$http){
    getData();
    function getData(){
        $http.get('server/get').success(function(data){
           $scope.cities = data; 
        });
    }
}

