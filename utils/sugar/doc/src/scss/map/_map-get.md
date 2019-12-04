# map-get

<!-- @namespace: sugar.scss.map.map-get -->

Type : **{ function }**


Get a value in the passed map using the passed key



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$map  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The map to get the value from  |  required  |
$key  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The key to get the value in the map  |  required  |

### Example
```scss
	sugar.map-get((
 hello: 'world'
), hello); // => 'world'
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)