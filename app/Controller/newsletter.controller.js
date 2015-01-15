angular.module('app')
        .controller('newsletterController', newsletterController)
        .directive('newsItem', function () {
            return{
                restrict: 'E',
                link: function (scope, element) {
                    element.on('click', function () {
                        console.log('clicked news');
                        scope.getNews();
                    });
                },
                template: "Hírlevél"
            };
        });

newsletterController.$inject = ['$scope', '$http', 'loadFactory', '$location'];

function newsletterController($scope, $http, loadFactory, $location) {
    var fromJson = 'app/Data/newsletter.json';

    $scope.getNews = function () {
        loadFactory.loadText();
        $location.path('/newsletter');
        $http({
            url: fromJson,
            method: 'post'
        }).success(function (response, status) {
            loadFactory.removeText();
            loadFactory.addItem('<div class="newsletter-buttons"></div>');
            
            for (i in response) {
                loadFactory.addItemTo('.newsletter-buttons', '<button class="btn btn-default" ng-click="getDataBack(' + response[i].id + ')">' + response[i].name + '</button>');
            }
        }).error(function (response, status) {
            console.log('resp: ' + response + " status: " + status);
        });
    };

    $scope.getDataBack = function (item) {
        loadFactory.loadText();
        $http({
            url: fromJson,
            method: 'post'
        }).success(function (response, status) {
            loadFactory.removeText();
            loadFactory.addItem('<div class="newsletter-data"><table></table></div>');

            for (var i=0; i< response.length; i++) {
                if(response[i].code == item){
                    loadFactory.addItemTo('.newsletter-data table', '<tr><td>'+response[i].id + '</td><td>'+ response[i].name +'</td><tr>');
                }
                
            }
        }).error(function (response, status) {
                console.log('response,status: '+response +" "+ status);
        });

        loadFactory.findItem('.newsletter-buttons');
    };

}

