(function () {
    var app = angular.module('ShoppingKart', ['ngRoute','ProductServices']);

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


    app.controller('skcontroller', function ($scope,ProductsRestAPI) {
        
        $scope.availableProducts=[];
        
        $scope.availableProdRequestPromise=ProductsRestAPI.productsRequestPromise();
        
        $scope.availableProdRequestPromise.then(
                function successCallback(response){
                    console.log(response.data);
                    alert('done!'+response.data[0]);
                    $scope.availableProducts=response.data;                    
                },
                function errorCallback(response){
                    alert('error');
                }
        );
                
    }
    );

})();


