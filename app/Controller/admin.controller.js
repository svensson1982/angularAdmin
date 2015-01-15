angular.module('app')
        .controller('admin', admin);
admin.$inject = ['$scope', '$http', '$location', '$injector', 'angularLoad', 'loadFactory'];

function admin($scope, $http, $location, $injector, angularLoad, loadFactory) {

    $scope.getMenu = function () {
        $http({
            url: 'app/Data/menuitem.json',
            method: 'post'
        }).success(function (data, status) {
            //get menu element and give to the scope
            $scope.menuelements = data;
            console.log("Ajax success: " + status);
        }).error(function (data, status) {

        });
    };
    //users controller inheritance

    $injector.invoke(usersController, this, {
        $scope: $scope
    });
    $injector.invoke(newsletterController, this, {
        $scope: $scope
    });
    $injector.invoke(offerController, this, {
        $scope: $scope
    });
    $injector.invoke(promiseController, this, {
        $scope: $scope
    });


    $scope.getUrl = function (item) {
        $location.path(item.url);
    };


    $scope.getDiscounts = function () {
        angularLoad.loadScript('app/Controller/discount.controller.js').then(function () {
            $injector.invoke(discountController, this, {
                $scope: $scope
            });
            console.log('loaded');
        }).catch(function () {
            console.log('Unable to load...');
        });
    };


/*
          angularLoad.loadScript('app/Services/discount.service.js').then(function () {
            console.log('loaded');
        }).catch(function () {
            console.log('Unable to load...');
        });

 */


    /*add user*/
    $scope.userTemplate = function () {
        loadFactory.removeText();
        $location.path('/adduser');
    };

}

