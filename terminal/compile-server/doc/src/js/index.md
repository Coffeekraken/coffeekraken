# compileServer

<!-- @namespace: compile-server.compileServer -->

Type : **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**


Expose the compile server API
### Available functions
- ```setup``` : Setup the compile server JS api
- ```compile``` : Send some code to the compile server and get the response easily


### Example
```js
	compileServer.setup({
 	// some options here...
});
compileServer.compile(myCoolCode, 'js').then((compiledCode) => {
 	// do something here...
});
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)

Default : **{**