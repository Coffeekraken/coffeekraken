# onSwipe

<!-- @namespace: sugar.js.dom.onSwipe -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Detect swipes gestures on touch devices.



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
elm  |  **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }**  |  The HTMLElement on which to detect the swipe  |  required  |
cb  |  **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**  |  The function to call on swipe. The callback function has as parameter an object that containthe swipe direction like left, right, up and down  |  required  |
threshold  |  **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**  |  The swipe threshold  |  optional  |  100

### Example
```js
	import onSwipe from '@coffeekraken/sugar/js/dom/onSwipe'
onSwipe(myCoolElm, (swipe) => {
	// check the swipe direction
	if (swipe.left) {
		// do something...
	}
	// support : left, right, up, down
	// etc...
}, {
	threshold : 50
});
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)

See : **Based on** : [https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d](https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d)