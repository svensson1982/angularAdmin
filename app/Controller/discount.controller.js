angular.module('app')
        .controller('discountController',discountController);

discountController.$inject = ['$scope','$http','$timeout','loadFactory','discountService','$location'];

function discountController($scope, $http, $timeout, loadFactory, discountService, $location){
   $scope.getDiscount = discountService.getDiscount();
   loadFactory.loadText();
       $location.path('discounts');
   $http({
       url: 'app/Data/discounts.json',
       method: 'post',
       headers:{ "Content-type" : "application/x-www-form-urlencoded; charset=utf-8"}
   }).success(function(response, status){
       loadFactory.removeText();
       for(var i in response){
        loadFactory.addItem('<div>'+response[i].item+'</div>');
        //+getDiscount(response[i].func)+'
       }
   }).error(function(response, status){
      console.log('response: '+response +' status '+ status);
   });
}