# lettersInReveal

<!-- @namespace: text-intro.lettersInReveal -->

Type : **{ function }**


Init the listener for the "letters-in-reveal" intro to work



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
offset  |  **{ Integer }**  |  An offset that represent the distance before entering the viewport for the detection  |  optional  |  -window.innerHeight*.2
delay  |  **{ Integer }**  |  The delay after the detection to trigger the animation  |  optional  |  300

### Example
```js
	@import 	lettersInReveal from '@coffeekraken/text-intro/js/animLettersInReveal';
lettersInReveal(); // init listeners
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)