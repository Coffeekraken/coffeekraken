# map-get-or

<!-- @namespace: sugar.scss.map.map-get-or -->

Type : **{ function }**


Get a map value by passing a list of wanted indexes, or return the default passed value



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$map  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The map to get the value from  |  required  |
$index-list  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The list of indexes to try to get  |  required  |
$default  |  **{ Midex }**  |  The default value to return if nothing is found in the map  |  optional  |  null

### Example
```scss
	sugar.map-get-or((
 coco: 'hello',
 plop: 'world'
), plop, null); // 'world'
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)