# slideIn

<!-- @namespace: text-intro.slideIn -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Init the listener for the "slide-in-" intro to work
Supported slides animation directions
- up
- right
- left
- down



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
offset  |  **{ Integer }**  |  An offset that represent the distance before entering the viewport for the detection  |  optional  |  -window.innerHeight*.2
delay  |  **{ Integer }**  |  The delay after the detection to trigger the animation  |  optional  |  300

### Example
```js
	@import 	slideIn from '@coffeekraken/text-intro/js/slideIn'
slideIn(); // init listeners
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)