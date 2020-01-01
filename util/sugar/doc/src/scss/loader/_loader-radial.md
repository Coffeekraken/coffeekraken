# loader-radial

<!-- @namespace: sugar.scss.loader.loader-radial -->

Type : **{ function }**


Generate a radial styled loader



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$shape  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The shape of the items that make the circle. Can be rect or circle  |  optional  |  circle
$size  |  **{ Number }**  |  The size of the items  |  optional  |  3em
$width  |  **{ Number }**  |  The width of the circle loader  |  optional  |  0.2em
$style  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The style of the items that form the loader. Can be none, hidden, dotted, dashed, solid, double, groove, ridge, inset, outset, initial or inherit  |  optional  |  solid
$color  |  **{ [Color](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#colors) }**  |  The color to use for the loader  |  optional  |  primary
$a-duration  |  **{ Second }**  |  How many time will be the animation  |  optional  |  2s
$a-delay  |  **{ Second }**  |  How many time to wait between two animation  |  optional  |  0s
$a-count  |  **{ Number }**  |  How many circles will be animated  |  optional  |  2
$a-spread  |  **{ Number }**  |  Specify a spread value for the animation of each circles  |  optional  |  1em
$a-ease  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  Specify the ease to use for the animation  |  optional  |  linear

### Example
```scss
	}
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)