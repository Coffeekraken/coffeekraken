# map-remove

<!-- @namespace: sugar.scss.map.map-remove -->

Type : **{ function }**


Remove one or multiple keys from the passed map



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$map  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The map to process  |  required  |
$keys...  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The key(s) to remove  |  required  |

Return **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }** The processed map

### Example
```scss
	sugar.map-remove((
 hello: 'world',
 coco: 'plop'
), coco);
// returned map:
(
 hello: 'world'
)
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)