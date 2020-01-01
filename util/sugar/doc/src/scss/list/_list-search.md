# list-search

<!-- @namespace: sugar.scss.list.list-search -->

Type : **{ function }**


Search for the passed value in the passed list and return true if exist, false if not



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$list  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The list in which to search for the passed value  |  required  |
$value  |  **{ Mixed }**  |  The value to search in the List  |  required  |

Return **{ Boolean }** true if the value exist in the list, false if not

### Example
```scss
	sugar.list-search(('hello', 'world'), 'hello'); // => true
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)