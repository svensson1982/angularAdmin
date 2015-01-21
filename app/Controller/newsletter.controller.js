angular.module('app')
        .controller('newsletterController', newsletterController)
        .directive('newsItem', function () {
            return{
                restrict: 'EA',
                link: function (scope, element) {
                    element.on('click', function () {
                        scope.getNews();
                    });
                },
                template: "Hírlevél"
            };
        })
        .directive('dynamic', function () {
            return{
                restrict: 'EA',
                replace: true,
                transclude: true,
                scope: {
                    dynamic: "=",
                    id: '=',
                    title: '='
                },
                link: function postLink(scope, element, attrs) {
                    scope.$watch( function (newVal, oldVal) {
                       /*angular.forEach(scope.title,function(val, key){                          
                            console.log("dynamic2" + scope.title);
                            element.html(val); 
                       });*/
                        console.log(scope.title);
                    });
                },
                template: '<a class="btn btn-default btn-block"  ng-repeat="ti in title" >{{ti.title}}|{{ti.id}}</a>'
            };
        });

newsletterController.$inject = ['$scope', '$http', 'loadFactory', 'newsletterFactory', '$location', '$timeout', '$q'];

function newsletterController($scope, $http, loadFactory, newsletterFactory, $location, $timeout, $q) {

    //get data by id
    $scope.getDataBack = newsletterFactory.getDataBack;
    var titArr = {};
    $scope.getNews = function () {
        
        loadFactory.loadText();
        $location.path('/newsletter');
        $http.get('server/newsletter_title.php')
                .success(function (response, status) {
                    loadFactory.removeText();
                    for (var i in response.title) {
                            titArr[i] = {
                                title:response.title[i],
                                id:response.id[i]
                            };
                            $scope.title = titArr;
                            console.log('got it!!');
                                                   
                    };
                });

    };


}

