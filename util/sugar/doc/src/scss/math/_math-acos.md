# math-acos

<!-- @namespace: sugar.scss.math.math-acos -->

Type : **{ function }**


Calculate the cosinus inverse of the passed angle



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$angle  |  **{ Number }**  |  The angle to calculate the cosinus inverse from  |  required  |
$unit  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The wanted unit. Can de deg, rad, grad or turn  |  optional  |  deg

Return **{ Number }** The calculated cosinus inverse

### Example
```scss
	sugar.math-acos(1, deg); // 0.0559529097deg
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)