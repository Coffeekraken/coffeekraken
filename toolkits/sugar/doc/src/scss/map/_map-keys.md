# map-keys

<!-- @namespace: sugar.scss.map.map-keys -->

Type : **{ function }**


Return a comma separated list of the map keys



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$map  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The map to process  |  required  |

Return **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }** The list of map keys

### Example
```scss
	sugar.map-keys((
 'hello': 'world',
 'coco': 'plop'
)); // => ('hello','coco')
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)