# str-split

<!-- @namespace: sugar.scss.string.str-split -->

Type : **{ function }**


Split a string using a delimiter



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$string  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The string to split  |  required  |
$delimiter  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The delimiter to split the string  |  optional  |  ""

Return **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }** A list a the splited string

### Example
```scss
	sugar.str-split('hello.world', '.'); // ('hello', 'world')
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)