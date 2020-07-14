# loader-grid

<!-- @namespace: sugar.scss.loader.loader-grid -->

Type : **{ function }**


Generate a grid style loader



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$shape  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The shape of the grid items. Can be rect or circle  |  optional  |  rect
$color  |  **{ [Color](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#colors) }**  |  The color to use for the grid items  |  optional  |  color(primary)
$cols  |  **{ Number }**  |  How many columns the grid must have  |  optional  |  3
$rows  |  **{ Number }**  |  How many rows must have the grid  |  optional  |  3
$size  |  **{ Number }**  |  The size of each grid items  |  optional  |  10px
$gap  |  **{ Number }**  |  The size of the gaps between the grid items  |  optional  |  5px
$offset  |  **{ Number }**  |  The offset used for the grid  |  optional  |  0
$rotate  |  **{ Number }**  |  Apply a rotation to the grid items  |  optional  |  0deg
$a-shape  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The animation shape to apply to the grid items. Can be rect or circle  |  optional  |  null
$a-steps  |  **{ Number }**  |  How many steps must have the animation  |  optional  |  5
$a-spread  |  **{ Number }**  |  How much must the grid items spread during the animation  |  optional  |  15px
$a-rotate  |  **{ Number }**  |  How many degrees must the grid items rotate during the animation  |  optional  |  null
$a-scale  |  **{ Number }**  |  Apply a scale for the animation of the grid items  |  optional  |  null
$a-opacity  |  **{ Number }**  |  Apply an opacity to the grid items during the animation  |  optional  |  null
$a-duration  |  **{ Second }**  |  The duration of the animation  |  optional  |  1s
$a-delay  |  **{ Second }**  |  How many seconds to wait between each animations  |  optional  |  0s
$a-ease  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The easing to use for the animation  |  optional  |  ease-in-out

### Example
```scss
	}
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)