# list-set-nth

<!-- @namespace: sugar.scss.list.list-set-nth -->

Type : **{ function }**


Set a value in the passed list at the passed index. The original value at the passed index will be replaced with the passed value



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$list  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The list to process  |  required  |
$index  |  **{ Number }**  |  The index to set the value in the list  |  required  |
$value  |  **{ Mixed }**  |  The value to set in the list  |  required  |

Return **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }** The new processed list

### Example
```scss
	sugar.list-set-nth(('hello','world'), 1, 'coco'); // => ('coco','world')
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)