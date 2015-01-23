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
                template: "Newsletter"
            };
        })
        .directive('dynamic', function () {
            return{
                restrict: 'EA',
                replace: true,
                scope: {
                    dataId: '=',
                    title: '=',
                    getData: "&"
                },
                link: function (scope, element, attrs) {
                    /*scope.$watch(function (newVal, oldVal) {
                     angular.forEach(scope.title,function(val, key){                          
                     console.log("dynamic2" + scope.title);
                     element.html(val); 
                     });
                     });*/
                    /*scope.getnews = function (d) {
                     alert(d);
                     };*/
                },
                template: '<a class="news-btn btn btn-default btn-block" ng-repeat="ti in title" ng-click="getData({{ti.id}});" data-id="{{ti.id}}" >{{$index+1+"."}}{{ti.title}}</a>'
                        //invalid key getnews ng-click
            };
        })
        .directive('newsResult', function () {
            return{
                restrict: 'E',
                // transclude: true,
                scope: true,
                templateUrl: 'newsletterResult.html',
                compile: function (tElement, tAttrs, transcludeFn) {
                    return function (scope, el, tAttrs) {
                        transcludeFn(scope, function cloneConnectFn(cElement) {
                            tElement.after('<div>result</div>').after(cElement);
                        });
                    };
                }
            };
        });

newsletterController.$inject = ['$scope', '$http', 'loadFactory', 'newsletterFactory', '$location', '$timeout', '$q'];

function newsletterController($scope, $http, loadFactory, newsletterFactory, $location, $timeout, $q) {
    $scope.newsl = "newsletter controller";
    //get data by id
    $scope.getData = function (d) {
        alert("id->" + d);
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
                            title: response.title[i],
                            id: response.id[i]
                        };
                        $scope.title = titArr;
                        console.log('got it!!');
                    }
                    ;
                });
    };

    $scope.newsID = function () {

        $http.get('server/newsletter_data.php')
                .success(function (response, status) {
                    for (var i in response.title) {
                        titArr[i] = {
                            title: response.title[i],
                            id: response.id[i]
                        };
                        $scope.title = titArr;
                        console.log('got it!!');
                    }
                    ;
                });
    };
}

