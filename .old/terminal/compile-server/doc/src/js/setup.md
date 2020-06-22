# setup

<!-- @namespace: compile-server.setup -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Setup the compiler


### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
settings  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  The new settings  |  optional  |  {}

### Example
```js
	// possible settings
compileServer.setup({
		// the api base url
		apiUrl : 'http://localhost:4000',
		// a queryString to append to each request
		queryString : 'myVar=hello&myOtherVar=world'
});
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)