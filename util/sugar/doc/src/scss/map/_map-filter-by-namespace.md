# map-filter-by-namespace

<!-- @namespace: sugar.scss.map.map-filter-by-namespace -->

Type : **{ function }**


Return all the map values that have a key that match the passed namespace



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$map  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The map to process  |  required  |
$namespace  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The namespace to search like (something.another.thing)  |  required  |

Return **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }** The filtered map

### Example
```scss
	sugar.map-filter-by-namespace((
 'hello.world': 'Hello',
 'coco.world': 'Coco',
 'hello.that': 'That is cool'
), 'hello');
// return that map:
(
  'hello.world': 'Hello',
  'hello.that': 'That is cool'
)
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)