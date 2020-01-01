# str-index

<!-- @namespace: sugar.scss.string.str-index -->

Type : **{ function }**


Returns the first index of $substring in $string, or null if $string doesn’t contain $substring.



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$string  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The string to process  |  required  |
$substring  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The string to search  |  required  |

Return **{ Number }** The index of the finded substring or null if not exist...

### Example
```scss
	sugar.str-index('Hello world', 'world'); // => 7
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)