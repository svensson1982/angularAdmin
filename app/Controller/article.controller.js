angular.module("app")
	.controller('articleController',articleController)
	.directive('myArticle', function(){
		return{
			restrict: 'E',
			scope: {
				articleInfo: '=info'
			},
			templateUrl: 'app/Templates/articleTemplate.html'
		}
	});

articleController.$inject = ['$scope','$http', '$document'];

function articleController($scope, $http, $document){
	$scope.showArticle = function(){
		//add load
		var container = $document.find('.result');
		var res = angular.element('<div>Loading....</div>');
        container.append(res);

		$http({
			url:'app/Data/article.json',
			method: 'post'
		})
		.success(function(response, status){
			$scope.articles = response;
			console.log('article: '+status);
			console.log(response);
			//remove load
        	container.empty();
		})
		.error(function(status, header){
			console.log('status: ' + status);
			console.log('header: ' + header);
		});
	};
}