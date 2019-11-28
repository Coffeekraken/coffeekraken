# addEventListenerOnce

Add an event listener that will be trigerred only once



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
elm  |  **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }**  |  The element to add the event listener on  |  required  |
event  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The event to listen for  |  required  |
callback  |  **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**  |  The callback function to call on event  |  required  |
bind  |  **{ Mixed }**  |  The object to bind to the callback function  |  optional  |  null
useCapture  |  **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**  |  Use capture phase or not  |  optional  |  false
options  |  **{ object }**  |  An options object that specifies characteristics about the event listener  |  optional  |  {}

Return **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }** The remove event listener function

### Example
```js
	import addEventListenerOnce from '@coffeekraken/sugar/js/dom/addEventListenerOnce'
const removeEventListener = addEventListenerOnce(myElm, 'click', (e) => {
    // do something on click
})
// remove event listener if wanted
removeEventListener()
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)