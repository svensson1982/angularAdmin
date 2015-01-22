angular.module('app')
        .controller('offerController', offerController)
        .directive('offerItem', function () {
            return{
                restrict: 'E',
                //scope: true,
                link: function (scope, element) {
                    element.on('click', function () {
                        console.log('clicked offer');
                        scope.getOffer();
                    });
                },
                template: 'Offer'
            };
        })
        .directive('offerResult', function () {
            return{
                restrict: 'A',
                replace: true,
                scope: {
                    id: "@",
                    title: "=",
                    name: "=",
                    price: "="
                }
            };
        });

offerController.$inject = ['$scope', '$http', 'loadFactory', '$location'];

function offerController($scope, $http, loadFactory, $location) {

    // create a blank object to hold our form information
    // $scope will allow this to pass between controller and view
    var formData = {};

    // process the form
    $scope.getOffer = function () {
        $location.path('/offer');
        loadFactory.loadText();
        $http({
            method: 'POST',
            url: './server/app.php',
            //data: $.param($scope.formData), // pass in data as strings
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
        }).success(function (data, status) {
            for (i in data.offer_id) {
                formData[i] = {
                    id: data.offer_id[i],
                    title: data.offer_title[i],
                    name: data.offer_name[i],
                    price: data.offer_price[i]
                };
                loadFactory.removeText();
                $scope.offerData = formData;
                console.log('complete');
            }
        }).error(function (data, status) {
            console.log('data->' + data + " status-> " + status);
        });

    };
}
