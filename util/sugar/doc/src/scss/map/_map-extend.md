# map-extend

<!-- @namespace: sugar.scss.map.map-extend -->

Type : **{ function }**


Extend the passed map with the others passed map(s)



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$map  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The map to @extend  |  required  |
$maps  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) , List-Map }**  |  The map(s) used to extend the first one  |  required  |

Return **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }** The extended map

### Example
```scss
	sugar.map-extend((
 'hello': 'world'
), (
 'coco': 'plop'
));
// returned map:
(
 'hello': 'world',
 'coco': 'plop'
)
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)