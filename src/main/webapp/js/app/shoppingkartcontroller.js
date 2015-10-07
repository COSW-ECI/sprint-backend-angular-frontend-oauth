(function () {
    var app = angular.module('ShoppingKart', ['ngRoute']);

    app.config(function ($routeProvider) {
        $routeProvider
                .when('/new', {
                    templateUrl: 'seleccion.html'
                })                
                .when('/list', {
                    templateUrl: 'checkout.html'
                })
                .when('/home', {
                    templateUrl: 'home.html'                 
                });
    });


    app.controller('skcontroller', function ($scope,$location) {

    }
    );

})();


