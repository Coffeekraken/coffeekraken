# color-modifier

<!-- @namespace: sugar.scss.core.function.color-modifier -->

Type : **{ function }**


Return the color in a modifier list



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$modifiers  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The modifiers list  |  required  |

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The color name

### Example
```scss
	$my-color : sugar.color-modifier(outline primary); // => primary
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)