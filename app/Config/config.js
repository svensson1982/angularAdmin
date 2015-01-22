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
                        controller: "offerController",
                        templateUrl: "app/Templates/offer.html"
                    })
                    /*.when("/discounts", {
                        controller: "discountsController"
                    })*/
                    .when("/adduser", {
                        templateUrl: "app/Templates/adduser.html",
                        controller: "addUserController"
                    })
                    /*.when("/promise", {
                        controller: "promiseController"
                    })*/
                    .when("/todo", {
                        templateUrl: "app/Templates/todo.html",
                        controller: "todoController"
                    })
                    .otherwise({
                        redirectTo: "/"
                    });
                    console.log('config->' );
                    //$locationProvider.html5Mode(true).hashPrefix();  
        }]);