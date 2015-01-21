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
        .directive('dynamic',['$interval', function ($interval) {
            return{
                restrict: 'EA',
                replace: true,
                transclude: true,
                scope: {
                    dataId: '=',
                    title: '=',
                    getnews: "&"
                },
                link: function (scope, element, attrs) {
                    scope.$watch( function (newVal, oldVal) {
                       /*angular.forEach(scope.title,function(val, key){                          
                            console.log("dynamic2" + scope.title);
                            element.html(val); 
                       });*/
                        
                    });
                    scope.getnews = function(d){alert(d);};//scope.getData();
                },
                template: '<a class="news-btn btn btn-default btn-block" ng-repeat="ti in title" ng-click="getnews({{ti.id}});" data-id="{{ti.id}}" >{{ti.title}}</a>'
                //invalid key getnews ng-click
            };
        }]);

newsletterController.$inject = ['$scope', '$http', 'loadFactory', 'newsletterFactory', '$location', '$timeout', '$q'];

function newsletterController($scope, $http, loadFactory, newsletterFactory, $location, $timeout, $q) {

    //get data by id
    $scope.getData = function(d){
        alert("id->"+d);
    };
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

