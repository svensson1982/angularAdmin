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
                transclude: true,
                scope: {
                    dataId: '=',
                    title: '=',
                    getData: "&"
                },
                /*compile: function (tElement, tAttrs, transcludeFn) {
                    return function (scope, el, tAttrs) {
                        tElement.on('click', function () {
                            transcludeFn(scope, function cloneConnectFn(cElement) {
                                tElement.after('<div>result</div>').after(cElement);
                            });
                            console.log('add something');
                        });
                    };
                },*/
                link: function(scope,elem){
                    elem.on('click', function(){
                       var news = elem.find('news-result');
                       news.append(scope.content);
                       console.log('news');
                    });
                },
                template: '<a class="news-btn btn btn-default btn-block" ng-repeat="ti in title" ng-click="newsID(ti.id);" data-id="{{ti.id}}" >{{$index+1+". " + ti.title}}</a>'
            };
        });
/*.directive('newsResult', function () {
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
 });*/

newsletterController.$inject = ['$scope', '$http', 'loadFactory', 'newsletterFactory', '$location', '$timeout', '$q'];
function newsletterController($scope, $http, loadFactory, newsletterFactory, $location, $timeout, $q) {
    $scope.newsl = "newsletter controller";

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
    $scope.newsID = function (btnId) {
        console.log(btnId);
        $http.post('./server/newsletter_data.php',{'id': 12327} // pass in data as strings
            //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        ).success(function (response, status) {
                    for (var i in response.table_content) {
                        titArr[i] = {
                            table_begin: response.table_begin[i],
                            table_content: response.table_content[i],
                            table_end: response.table_end[i]
                        };
                        $scope.content = titArr;
                        console.log('response-> '+ response);
                        console.log('status-> '+ status);
                    };
                }).error(function(resp, stat){
                    console.log("response-> "+resp+ " stat-> "+ stat);
                });
    };
}

