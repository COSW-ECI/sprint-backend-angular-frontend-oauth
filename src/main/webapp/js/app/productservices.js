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

    }
    );

})();





