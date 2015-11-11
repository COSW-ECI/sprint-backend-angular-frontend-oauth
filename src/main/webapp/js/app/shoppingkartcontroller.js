(function () {
    var app = angular.module('ShoppingKart', ['ngRoute','ProductServices','SecurityModule']);

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


    app.controller('loginController',function($scope,OAuthServices){
        
        this.userName="";
        this.password="";
        
        this.login=function(){
            loginPromise=OAuthServices.loginPromise(this.userName,this.password);
            console.log("OAuth2 token generation for "+","+this.userName);
            loginPromise.then(
                //success
                function(response){
                    console.log("Success:"+response);
                },
                //error
                function(response){
                    console.log("Error:"+response);
                }
            );
        };
        
    });

    app.controller('skcontroller', function ($scope,ProductsRestAPI) {
        
        $scope.availableProducts=[];
        
        $scope.selectedProducts=[];
        
        $scope.selectedProductId=-1;

        $scope.selectedProductDetail=null;
        
        $scope.availableProdRequestPromise=ProductsRestAPI.productsRequestPromise();
        
        $scope.addToSelectedProducts=function(){            
            $scope.selectedProducts.push($scope.selectedProductDetail);
            console.log('Shopping kart updated'+JSON.stringify($scope.selectedProducts));
        };
        
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
        
    });


    app.factory('tokenFactory', function () {
        var data = {
            token: ""
        };
        return {
            getToken: function () {
                return data.token;
            },
            setToken: function (tk) {
                data.token=tk;
            }
        };
    });

})();


