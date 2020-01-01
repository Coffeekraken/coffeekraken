# list-append

<!-- @namespace: sugar.scss.list.list-append -->

Type : **{ function }**


Append a value to the passed list



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$list  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The list to append the value to  |  required  |
$value  |  **{ Mixed }**  |  The value to append to the list  |  required  |
$separator  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The separator to use. Can be auto, space or comma  |  optional  |  auto

Return **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }** The new list with the appended value

### Example
```scss
	sugar.list-append(hello world, coco, comma); // hello, world, coco
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)