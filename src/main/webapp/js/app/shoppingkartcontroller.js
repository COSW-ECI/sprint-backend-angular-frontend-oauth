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


    app.controller('loginController',function($scope,OAuthServices,tokenFactory){
        
        $scope.userName="";
        $scope.password="";
        
        this.login=function(){
            console.log("OAuth2 token generation for "+","+$scope.userName);
            loginPromise=OAuthServices.loginPromise($scope.userName,$scope.password);
            
            loginPromise.then(
                //success
                function(response){                    
                    console.log(response.data.access_token);
                    tokenFactory.setToken(response.data.access_token);                    
                    tokenFactory.setUser($scope.userName);
                },
                //error
                function(response){
                    console.log("Error:"+JSON.stringify(response));
                }
            );
        };
        
    });

    app.controller('skcontroller', function ($scope,ProductsRestAPI,tokenFactory) {
        
        $scope.availableProducts=[];
        
        $scope.selectedProducts=[];
        
        $scope.selectedProductId=-1;

        $scope.selectedProductDetail=null;
        
        $scope.availableProdRequestPromise=ProductsRestAPI.productsRequestPromise(tokenFactory.getToken());
        
        $scope.currentUser=tokenFactory.getUser();
        
        
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
            
            ProductsRestAPI.productByIdRequestPromise(idprod,tokenFactory.getToken()).then(
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
            token: "",
            user:"anonymous"
        };
        return {
            getUser: function(){
                return data.user;
            },
            setUser: function(un){                
                data.user=un;
            },
            getToken: function () {
                return data.token;
            },
            setToken: function (tk) {
                data.token=tk;
            }
        };
    });

})();


