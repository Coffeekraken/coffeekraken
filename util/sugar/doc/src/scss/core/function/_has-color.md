# has-color

<!-- @namespace: sugar.scss.core.function.has-color -->

Type : **{ function }**


Check if the provided color is a registered one or not



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$color  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The color nane to check  |  required  |

Return **{ Boolean }** True if exists, false if not

### Example
```scss
	sugar.has-color(primary); // => true
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)