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
        })
        .directive('newsletterTitle', function () {
            return{
                restrict: 'E',
                scope: {
                    id: "=data-id",
                    title: "=data-title"
                },
                replace: true,                
                template: '<button class="btn btn-default btn-block">{{id.id}}</button>',
                link: function (scope, element) {
                    element.on('click', function () {
                        console.log('clicked news');
                        scope.getDataBack();
                    });
                }
            };
        });

newsletterController.$inject = ['$scope', '$http', 'loadFactory', 'newsletterFactory', '$location'];

function newsletterController($scope, $http, loadFactory, newsletterFactory, $location) {
  
    //get data by id
    $scope.getDataBack = newsletterFactory.getDataBack;
    $scope.getNews = function () {
        loadFactory.loadText();
        $location.path('/newsletter');
        $http({
            url: 'server/newsletter_title.php',
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (response, status) {
            loadFactory.removeText();
            loadFactory.addItem('<div class="newsletter-buttons col-md-3"></div>');
            for (var i in response.title) {
                $scope.datas = {};
                $scope.datas.id= response.id[i];
                $scope.datas.title= response.title[i];
                loadFactory.addItemTo('.newsletter-buttons', '<newsletter-title data-id="'+response.id[i]+'" data-title="'+response.title[i]+'"></newsletter-title>');
            }

        }).error(function (response, status) {
            console.log('resp: ' + response + " status: " + status);
        });
    };


}

