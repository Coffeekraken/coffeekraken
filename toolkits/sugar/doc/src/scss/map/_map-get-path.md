# map-get-path

<!-- @namespace: sugar.scss.map.map-get-path -->

Type : **{ function }**


Return the map value depending on the passed path



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$map  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The map in which to get the value  |  required  |
$path  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The path to get the value from  |  required  |
$default:null  |  **{ Mixed }**  |  The default value to return if none exist  |  required  |

Return **{ Mixed }** The value wanted

### Example
```scss
	sugar.map-get-path((
   'hello': 'world',
   'coco': (
     'plop': 'youhou'
   )
), 'coco.plop');
// => 'youhou'
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)