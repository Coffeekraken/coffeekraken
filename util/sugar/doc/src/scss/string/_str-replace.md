# str-replace

<!-- @namespace: sugar.scss.string.str-replace -->

Type : **{ function }**


Replace the passed string with another one in a specific string



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$string  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The string in which to replace the searched one  |  required  |
$search  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The string to replace  |  required  |
$replace  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The string used as replacement  |  optional  |  ""

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The processed string

### Example
```scss
	sugar.str-replace('Hello world', 'world', 'coco'); // 'Hello coco'
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)