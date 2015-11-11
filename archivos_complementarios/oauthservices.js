(function () {
    var app = angular.module('SecurityModule', []);

    app.service('OAuthServices', function ($http) {
        
        this.loginPromise = function (user,password) {            
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/myapp/oauth/token?username='+user+'&password='+password+'&client_id=mycompany&client_secret=mycompanykey&grant_type=password&scope=read'
            });            
        };

    }
    );

})();





