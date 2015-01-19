angular.module('app')
        .factory('newsletterFactory', newsletterFactory);

newsletterFactory.$inject = ['$http'];

function newsletterFactory($http) {
    var item = {};
    item.getDataBack = function (id) {
        $http({
            url: 'server/newsletter_data.php',
            method: 'post',
            data: {get_id: id}
        }).success(function (resp, stat) {
            //add-result for click
            //loadFactory.addItem('<div class="newsletter-result"></div>');
            console.log(resp + stat);
        }).error(function (resp, stat) {
            console.log(resp + stat);
        });        
    };
    return item;
}