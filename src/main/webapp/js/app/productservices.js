(function () {
    var app = angular.module('ProductServices', []);

    app.service('ProductsRestAPI', function ($http) {
        this.getData = function (dataid) {
            return [
            {
                id: 1,
                nombre: "xbox",
                precio: 32000
            },
            {
                id: 2,
                nombre: "ipad",
                precio: 12000
            },
            {
                id: 3,
                nombre: "laptop",
                precio: 42000

            }
            ];
        };
    }
    );

})();





