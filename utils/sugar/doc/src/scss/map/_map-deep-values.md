# map-deep-values

<!-- @namespace: sugar.scss.map.map-deep-values -->

Type : **{ function }**


Get values of a map even if it is deep



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$map  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The map to get values from  |  required  |

Return **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }** The list of map values

### Example
```scss
	sugar.map-deep-values((
   'hello': 'world',
   'coco': (
      'plop': 'youhou'
   )
));
// => ('world', 'youhou')
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)