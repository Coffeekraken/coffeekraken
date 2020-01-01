# math-convert-angle

<!-- @namespace: sugar.scss.math.math-convert-angle -->

Type : **{ function }**


Convert the passed angle into another unit like rad, deg, grad or turn



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$value  |  **{ Number }**  |  The angle value to convert  |  required  |
$unit  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The wanted unit. Can be rad, deg, grad or turn  |  required  |

Return **{ Number }** The converted angle value

### Example
```scss
	sugar.math-convert-angle()
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)