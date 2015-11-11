###Escuela Colombiana de Ingeniería.
###Construcción de Software - COSW
###Taller - Seguridad de APIs REST basada en Tokens

En este ejercicio va a integrar un esquema de seguiridad basada en Tokens a una aplicación implementada con SpringMVC para el _Backend_ y Angular.js para el _Frontend_.
####Backend
1. Agregue las dependencia de Spring-Security en el proyecto (pom.xml):

        <!--Spring security-->        <dependency>            <groupId>org.springframework</groupId>            <artifactId>spring-core</artifactId>            <version>4.0.9.RELEASE</version>        </dependency>        <dependency>            <groupId>org.springframework.security.oauth</groupId>            <artifactId>spring-security-oauth2</artifactId>            <version>2.0.3.RELEASE</version>        </dependency>
2. Copie el archivo *security-context.xml* suministrado en 'archivos_complementarios' en la ruta src/main/resources 3. En el archivo de configuración de la aplicación (web.xml), habilite los filtros de Spring Security:	```    <!--SPRING SECURITY-->        <context-param>        <param-name>contextConfigLocation</param-name>        <param-value>classpath:security-context.xml</param-value>    </context-param>    <filter>        <filter-name>springSecurityFilterChain</filter-name>        <filter-class>            org.springframework.web.filter.DelegatingFilterProxy        </filter-class>    </filter>    <filter-mapping>        <filter-name>springSecurityFilterChain</filter-name>        <url-pattern>/*</url-pattern>    </filter-mapping>
    
    ```
    
4. Para evitar conflictos entre SpringMVC y SpringSecurity:
   1. modifique en el web.xml la ruta que interceptará los servicios REST, para que ahora sea en /* en lugar de /rest/*

	    ```     <servlet-mapping>        <servlet-name>api</servlet-name>        <url-pattern>/*</url-pattern>    </servlet-mapping>    ```
   2. Modifique la configuración de los controladores para que la ruta incluya el elemento 'rest':
	    ```	@RequestMapping("/rest/products")	 ```
	 5. Copie los archivos suministrados (en 'archivos complementarios') en los fuentes proyecto. Recuerde dejarlos en sus paquetes originales:	* GuestServiceImpl.java	* TokenController.java	* UserAuthenticationProvider.java6. Para que el Bean definido en TokenController sea cargado al momento de levantar el contexto de Spring, recuerde agregarlo dentro del espacio de búsqueda de componentes en el archivo de configuración de Spring (applicationContext.xml):		<context:component-scan base-package="edu.eci.cosw.oauthsec" />7. Haga los cambios que hagan falta para que los siguientes usuarios/contraseñas sean autorizados para usar el API REST:
	* scott/tiger
	* usuario1/clave18. Inicie la aplicación con JETTY, y rectifique que al ingresar la dirección http://localhost:8080/myapp/oauth/token, el browser muestre una ventana emergente de autenticación.
9. Ahora, pruebe ingresar la misma URL, pero incluyendo la información de autenticación (en este caso, con el usuario 'scott'). Verifique que lo anterior genera un documento jSON con la propiedad access_token:

	```
http://localhost:8080/myapp/oauth/token?username=scott&password=tiger&client_id=mycompany&client_secret=mycompanykey&grant_type=password&scope=read	```###Front-endAhora que el API rest está restringido, y que requiere un token válido para su uso, es necesario modificar la aplicación del _frontend_, de manera que permita realizar un proceso de autenticación del cual se obtenga un token para realizar las operaciones.

1. Incluya, en las librerías de aplicación de javascript, el archivo _oauthservices.js_ suministado. Revise el contenido del mismo e identifique cual es su funcionalidad.

2. En la página 'maestra' (index.html), incluya el archivo javascript agregado:
	```	<script src="js/app/oauthservices.js"></script>	```

3. El archivo de javascript antes incorporado define un módulo llamado SecurityModule. Agregue éste el en módulo 'ShoppingKart':
	
	```	(function () {    var app = angular.module('ShoppingKart', ['ngRoute','ProductServices','SecurityModule']);```4. Para poder mantener la información del Token que se generará, y del usuario que se ha autenticado, cree una fábrica (puede hacerlo en el archivo shoppingkartcontroller.js):	```    app.factory('tokenFactory', function () {        var data = {            token: "",            user:"anonymous"        };        return {            getUser: function(){                return data.user;            },            setUser: function(un){                                data.user=un;            },            getToken: function () {                return data.token;            },            setToken: function (tk) {                data.token=tk;            }        };    });	```5. Modifique los servicios ProductsRestAPI que hagan uso del API REST(definidos en _productservices.js_) para que ahora incluyan dentro de sus parámetros un token, y para que antes de realizar las peticiones agreguen en el encabezado de la misma dicho token. Por ejemplo, el servicio que consulta el conjunto completo de productos debería quedar como:	```	this.productsRequestPromise = function (token) {                        $http.defaults.headers.common['Authorization'] = "Bearer " + token;            return $http({                method: 'GET',                url: 'rest/products'            });                    };	```6. Cree un nuevo controlador dedicado a la parte de autenticación (puede hacerlo en el archivo _shoppingkartcontroller.js_). Este controlador, en caso de recibir un token, asigna dicho token junto al nombre del usuario autenticado a la fábrica creada anteriormente:	```app.controller('loginController',function($scope,OAuthServices,tokenFactory){                $scope.userName="";        $scope.password="";                this.login=function(){            console.log("OAuth2 token generation for "+","+$scope.userName);            loginPromise=OAuthServices.loginPromise($scope.userName,$scope.password);                        loginPromise.then(                //success                function(response){                                        console.log(response.data.access_token);                    tokenFactory.setToken(response.data.access_token);                                        tokenFactory.setUser($scope.userName);                },                //error                function(response){                    console.log("Error:"+JSON.stringify(response));                }            );        };            });	```7. Modifique la página _home.html_ (que tiene el formulario de autenticación), para que sus campos queden asociados a las propiedades userName y password del controlador antes creado. Haga también que al hacer clic en el botón se ejecute la función 'login()' de este mismo controlador (recuerde usar los elementos ng-controller, ng-model y ng-click).

8. Modifique el controlador del carro de compras (skcontroller) para que cuando haga uso de las operaciones de los servicios, incluyan en éstos el token que se haya guardado en la fábrica. Para hacer esto

	1. Inyecte el tokenFactory en el controlador del carro de compras:
  ```
  app.controller('skcontroller', function ($scope,ProductsRestAPI,tokenFactory) ...
  ```  
	2. Modifique todos los llamados a los servicios (los modificados en el punto 5), para que en la invocación ahora se incluya el toquen que esté actualmente guardado en el fábrica. Por ejemplo, en el método 'setSelectedProduct' del controlador, el llamado a la 'promesa' del API quedaría como:
	
		```
	ProductsRestAPI.productByIdRequestPromise(idprod,tokenFactory.getToken())
		```		Y la inicialización de los productos disponibles quedaría como:		```$scope.availableProdRequestPromise=ProductsRestAPI.productsRequestPromise(tokenFactory.getToken());
		```9. Verifique el funcionamiento de la aplicación. Con este nuevo esquema, mientras el usuario no se autentique en la vista de 'home.html', no estará en capacidad de consultar los productos disponibles.