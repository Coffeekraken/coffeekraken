# loader-flip-ball

<!-- @namespace: sugar.scss.loader.loader-flip-ball -->

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Generate a full animated, single element, flip ball style loader



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$shape  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The shape of the loader (circle,rect)  |  optional  |  circle
$size  |  **{ Number }**  |  The size of the loader  |  optional  |  2em
$colors  |  **{ [Color](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#colors) }**  |  The colors of the loader. Can be a list of colors  |  optional  |  (primary,success,warning,error,info)
$a-duration  |  **{ Second }**  |  The overall animation duration  |  optional  |  1s
$a-delay  |  **{ Second }**  |  The delay between two animation cycle  |  optional  |  0s
$a-ease  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The ease to use for the animation  |  optional  |  ease-in-out

### Example
```scss
	.my-cool-loader {
		@include sugar.loader-flip-ball();
}
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)