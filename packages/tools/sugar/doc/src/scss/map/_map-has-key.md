# map-has-key

<!-- @namespace: sugar.scss.map.map-has-key -->

Type : **{ function }**


Check if the passed map has the passed key. Return true if has, false if not



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$map  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The map to check  |  required  |
$key  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The key to check in the map  |  required  |

Return **{ Boolean }** true if has the key, false if not

### Example
```scss
	sugar.map-has-key((
   'hello': 'world',
   'coco': 'plop'
), 'hello'); // => true
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)