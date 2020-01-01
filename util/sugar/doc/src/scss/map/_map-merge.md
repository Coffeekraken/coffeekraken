# map-merge

<!-- @namespace: sugar.scss.map.map-merge -->

Type : **{ function }**


Merge the first passed map with the second passed one and return the result



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$map1  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The first map to extend  |  required  |
$map2  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The second map to extend the first one with  |  required  |

Return **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }** The extended map

### Example
```scss
	sugar.map-merge((
 hello: 'world'
), (
 coco: 'plop'
));
// returned map:
(
 hello: 'world',
 coco: 'plop'
)
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)