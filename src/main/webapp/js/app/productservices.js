(function () {
    var app = angular.module('ProductServices', []);

    app.service('ProductsRestAPI', function ($http) {
        
        this.productsRequestPromise = function () {            
            return $http({
                method: 'GET',
                url: 'rest/products'
            });            
        };
        
        this.productByIdRequestPromise = function (idprod) {            
            return $http({
                method: 'GET',
                url: 'rest/products/'+idprod
            });            
        };
        
        this.calculateShoppingKartCost=function(selectedProducts){
            console.log("calculating from:"+selectedProducts)
            var total=0;
            selectedProducts.map( function(item) {
                total+=item.precio;
            });
            return total;
        };

    }
    );

})();





