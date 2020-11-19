# injectStyle

<!-- @namespace: sugar.js.css.injectStyle -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Inject a passed style string in the DOM



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
style  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The style to inject in DOM  |  required  |
node  |  **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }**  |  The node in which to inject the new style tag  |  optional  |  document.head

Return **{ HTMLStyleElement }** The injected HTMLStyleElement node

### Example
```js
	import injectStyle from '@coffeekraken/sugar/js/css/injectStyle';
injectStyle('a { color: red; }');
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)