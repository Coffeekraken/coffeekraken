# list-nth

<!-- @namespace: sugar.scss.list.list-nth -->

Type : **{ function }**


Return the item of the list at the passed index



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$list  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The list to process  |  required  |
$index  |  **{ Number }**  |  The index of the element to get in the list  |  required  |

Return **{ Mixed }** The value at the passed index

### Example
```scss
	sugar.list-nth(('hello','world'), 2); // => 'world'
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)