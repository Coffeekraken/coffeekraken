# math-asin

<!-- @namespace: sugar.scss.math.math-asin -->

Type : **{ function }**


Calculate the sinus inverse



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$value  |  **{ Number }**  |  The value to use  |  required  |
$unit  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The unit wanted. Possible values are deg, rad, grad and turn  |  optional  |  deg

Return **{ Number }** The calculated asin

### Example
```scss
	sugar.math-asin(1, rad); // => 1.5698197643rad
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)