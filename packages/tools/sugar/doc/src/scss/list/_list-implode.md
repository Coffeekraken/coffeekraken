# list-implode

<!-- @namespace: sugar.scss.list.list-implode -->

Type : **{ function }**


Join all the list items using the passed glue and return a string



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$list  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The list to implode  |  required  |
$glue  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The glue to use to implode the list  |  optional  |  ""

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The imploded list in string format

### Example
```scss
	sugar.list-implode(('hello','world'), '-'); // hello-world
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)