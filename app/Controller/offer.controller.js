angular.module('app')
        .controller('offerController',offerController)
        .directive('offerItem', function(){
        	return{
                    restrict: 'E',
                link: function(scope, element){
                    element.on('click', function(){
                        console.log('clicked');
                        scope.getOffer();
                    });
                },
        	template: 'Offer'
            };                
        });

offerController.$inject = ['$scope','$http','loadFactory'];

function offerController($scope, $http, loadFactory){

    // create a blank object to hold our form information
    // $scope will allow this to pass between controller and view
    $scope.formData = {};

    // process the form
    $scope.getOffer = function () {
    	loadFactory.loadText();
        $http({
            method: 'POST',
            url: './server/app.php',
            data: $.param($scope.formData), // pass in data as strings
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
        }).success(function (data, status) {
                    console.log(data);
                    loadFactory.removeText();
                    loadFactory.addItem('<div>'+data+'</div>');
                }).error(function(data, status){
                	console.log('data->'+ data + " status-> " +status);
                });

    }
}
