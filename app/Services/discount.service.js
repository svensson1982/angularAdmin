angular.module('app')
        .service('discountService',discountService);

discountService.$inject = ['$http'];

function discountService($http){
    var discount = {};
    
    discount.getDiscount = function(){
        
    };
    
    return discount;
}