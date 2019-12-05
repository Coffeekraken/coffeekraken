# list-index

<!-- @namespace: sugar.scss.list.list-index -->

Type : **{ function }**


Return the index of the wanted value in the passed list.



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$list  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The list to process  |  required  |
$value  |  **{ Mixed }**  |  The value to search in the list  |  required  |

Return **{ Number }** The index of the founded value or null

### Example
```scss
	sugar.list-index(('hello','world'), 'world'); // => 2
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)