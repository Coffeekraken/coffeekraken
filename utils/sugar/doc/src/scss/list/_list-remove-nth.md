# list-remove-nth

<!-- @namespace: sugar.scss.list.list-remove-nth -->

Type : **{ function }**


Remove item from list using an index



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$list  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The list to process  |  required  |
$index  |  **{ Number }**  |  The index of the item to remove from the list  |  required  |

Return **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }** The processes list

### Example
```scss
	sugar.list-remove-nth(('hello','world'), 1); // ('hello')
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)