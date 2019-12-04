# list-prepend

<!-- @namespace: sugar.scss.list.list-prepend -->

Type : **{ function }**


Prepend a value in the passed list



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$list  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The list to process  |  required  |
$value  |  **{ Mixed }**  |  The value to prepend in the list  |  required  |
$separator  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The separator to use. Can be auto, space or comma  |  optional  |  auto

Return **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }** The new list with his new value

### Example
```scss
	sugar.list-prepend(('hello','world'), 'coco'); // => ('coco','hello','world')
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)