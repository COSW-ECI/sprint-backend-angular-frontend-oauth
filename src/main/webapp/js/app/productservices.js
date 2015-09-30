(function () {
    var app = angular.module('ProductServices', []);

    app.service('ProductsRestAPI', function ($http) {
        this.getData = function (dataid) {
            return [
            {
                idproducto: 1,
                nombre: "xbox",
                precio: 32000
            },
            {
                idproducto: 2,
                nombre: "ipad",
                precio: 12000
            },
            {
                idproducto: 3,
                nombre: "laptop",
                precio: 42000

            }
            ];
        };
    }
    );

})();





