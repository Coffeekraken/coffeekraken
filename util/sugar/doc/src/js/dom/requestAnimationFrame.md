# requestAnimationFrame

<!-- @namespace: sugar.js.dom.requestAnimationFrame -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Proxy for the window.requestAnimationFrame function



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
cb  |  **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**  |  The function to call when it's time to update your animation for the next repaint  |  required  |

Return **{ Integer }** A long integer value, the request id, that uniquely identifies the entry in the callback list

### Example
```js
	requestAnimationFrame(function() {
   // do something...
});
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)