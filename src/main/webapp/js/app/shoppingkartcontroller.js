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
        
        $scope.selectedProductId=-1;

        $scope.selectedProductDetail=null;
        
        $scope.availableProdRequestPromise=ProductsRestAPI.productsRequestPromise();
                
        $scope.availableProdRequestPromise.then(
                //promise success
                function(response){
                    console.log(response.data);                    
                    $scope.availableProducts=response.data;                    
                },
                //promise error
                function(response){
                    console.log('Unable to get data from REST API:'+response);
                }
        );

        $scope.setSelectedProduct=function(idprod){
            $scope.selectedProductId=idprod;
            
            ProductsRestAPI.productByIdRequestPromise(idprod).then(
                //promise success
                function(response){
                    console.log(response.data);                    
                    $scope.selectedProductDetail=response.data;                    
                },
                //promise error
                function(response){
                    console.log('Unable to get data from REST API:'+response);
                }
            );
            
        };             
        
        
    }
    );

})();


