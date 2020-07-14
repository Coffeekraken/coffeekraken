# list-join

<!-- @namespace: sugar.scss.list.list-join -->

Type : **{ function }**


Return a string representing all the list items



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$list1  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The list to process  |  required  |
$list2  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The list to join with the first one  |  required  |
$separator  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The separator to use for the list. Can be auto, comma or space  |  optional  |  auto
$bracketed  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) , Boolean }**  |  If true is passed, the list will be bracketed  |  optional  |  auto

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The new list

### Example
```scss
	sugar.list-join(('hello','world'), ('coco'), space); // ('hello' 'world' 'coco')
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)