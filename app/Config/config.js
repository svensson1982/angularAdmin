angular.module('app')
        .config(['$locationProvider','$routeProvider',function($locationProvider, $routeProvider) {                
              
           $routeProvider
                    .when('/users', {         
                        controller: "usersController"
                    })
                    .when("/newsletter", {
                        templateUrl: "app/Templates/newsletter.html",
                        controller: "newsletterController"
                    })
                    .when("/offer", {
                        controller: "offerController"
                    })
                    .when("/discounts", {
                        controller: "discountsController"
                    })
                    .when("/adduser", {
                        templateUrl: "app/Templates/adduser.html",
                        controller: "addUserController"
                    })
                    .when("/promise", {
                        controller: "promiseController"
                    })
                    .otherwise({
                        redirectTo: "/"
                    });
                    //$locationProvider.html5Mode(true).hashPrefix();  
        }]);