# innerHtml

<!-- @namespace: sugar.js.dom.innerHtml -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Change the content of a Node with the possibility to animate the change using one of these animations:
- fade
- fadeUp
- fadeDown
- fadeLeft
- fadeRight



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
node  |  **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }**  |  The node to change to content of  |  required  |
content  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The new content of the node  |  required  |
settings  |  **{ [Object](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object) }**  |  The settings to change the content like 'animIn', 'animOut', and more...  |  optional  |  {}

Return **{ [Promise](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise) }** A promise resolved when the change has been made

### Example
```js
	import innerHtml from '@coffeekraken/sugar/js/dom/innerHtml'
innerHtml(myCoolNode, 'Hello World', {
   animIn: 'fade', // fade, fadeUp, fadeDown, fadeLeft, fadeRight
   animOut: 'fadeUp', // fade, fadeUp, fadeDown, fadeLeft, fadeRight
   animInDuration: 600, // in ms
   animOutDuration: 300, // in ms
   animInDistance: 25, // in px
   animOutDistance: 25, // in px
   animInEasing: 'ease-in-out',
   animOutEasing: 'ease-in-out'
}).then(() => {
   // do something when the change has been made...
});
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)