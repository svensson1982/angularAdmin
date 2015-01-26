angular.module("app")
        .controller('formController', formController)
        .directive('dataFormDirective', function () {
            return{
                restrict: 'C',
                scope: {
                    list: '=dynAttr'
                },
                link: function(scope, elem, attrs){
                    for(attr in scope.list){
                        elem.attr(scope.list[attr],scope.list[attr].value);
                    }
                }
            };
        });
        formController.$inject = ['$scope','$http'];

function formController($scope, $http) {
    
}