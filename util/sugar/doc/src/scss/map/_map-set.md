# map-set

<!-- @namespace: sugar.scss.map.map-set -->

Type : **{ function }**


Set a map property with the passed value


### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$map  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The map to modify  |  required  |
$key  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The key to set the propery to  |  required  |
$value  |  **{ Mixed }**  |  The value to set  |  required  |

Return **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }** The updated map

### Example
```scss
	$my-map : sugar.map-set($my-map, 'coco', 'Something cool');
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)