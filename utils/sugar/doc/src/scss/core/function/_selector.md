# selector

<!-- @namespace: sugar.scss.core.function.selector -->

Type : **{ function }**


Process selector to avoid having --default, etc...



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$selector  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The selector to process  |  required  |

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The processed selector

### Example
```scss
	sugar.selector('.input--default'); // => .input
sugar.selector('.input-default'); // => .input
sugar.selector('.input.default'); // => .input
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)