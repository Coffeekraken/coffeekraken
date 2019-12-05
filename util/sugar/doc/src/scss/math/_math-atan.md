# math-atan

<!-- @namespace: sugar.scss.math.math-atan -->

Type : **{ function }**


Calculate the tangent inverse of the passed angle



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$angle  |  **{ Number }**  |  The angle to calculate the tangent inverse from  |  required  |
$unit  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The wanted unit. Can be deg, rad, grad or turn  |  optional  |  deg

Return **{ Number }** The calculated tangent inverse of the passed angle

### Example
```scss
	sugar.math-atan(10, deg); // => 84.2988568542deg
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)