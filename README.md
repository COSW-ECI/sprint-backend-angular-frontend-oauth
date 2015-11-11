###Escuela Colombiana de Ingeniería.
###Construcción de Software - COSW
###Taller - Seguridad de APIs REST basada en Tokens

En este ejercicio va a integrar un esquema de seguiridad basada en Tokens a una aplicación implementada con SpringMVC para el _Backend_ y Angular.js para el _Frontend_.
####Backend
1. Agregue las dependencia de Spring-Security en el proyecto (pom.xml):



    
    ```
    
4. Para evitar conflictos entre SpringMVC y SpringSecurity:
   1. modifique en el web.xml la ruta que interceptará los servicios REST, para que ahora sea en /* en lugar de /rest/*

	    ``` 
   2. Modifique la configuración de los controladores para que la ruta incluya el elemento 'rest':
	    ```
	 
	* scott/tiger
	* usuario1/clave1
9. Ahora, pruebe ingresar la misma URL, pero incluyendo la información de autenticación (en este caso, con el usuario 'scott'). Verifique que lo anterior genera un documento jSON con la propiedad access_token:

	```
http://localhost:8080/myapp/oauth/token?username=scott&password=tiger&client_id=mycompany&client_secret=mycompanykey&grant_type=password&scope=read

1. Incluya, en las librerías de aplicación de javascript, el archivo _oauthservices.js_ suministado. Revise el contenido del mismo e identifique cual es su funcionalidad.

2. En la página 'maestra' (index.html), incluya el archivo javascript agregado:


3. El archivo de javascript antes incorporado define un módulo llamado SecurityModule. Agregue éste el en módulo 'ShoppingKart':
	
	```

8. Modifique el controlador del carro de compras (skcontroller) para que cuando haga uso de las operaciones de los servicios, incluyan en éstos el token que se haya guardado en la fábrica. Para hacer esto

	1. Inyecte el tokenFactory en el controlador del carro de compras:
  ```
  app.controller('skcontroller', function ($scope,ProductsRestAPI,tokenFactory) ...
  ```  
	2. Modifique todos los llamados a los servicios (los modificados en el punto 5), para que en la invocación ahora se incluya el toquen que esté actualmente guardado en el fábrica. Por ejemplo, en el método 'setSelectedProduct' del controlador, el llamado a la 'promesa' del API quedaría como:
	
		```
	ProductsRestAPI.productByIdRequestPromise(idprod,tokenFactory.getToken())
		```
		```