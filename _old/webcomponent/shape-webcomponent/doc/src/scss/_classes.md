# classes

<!-- @namespace: drawer-webcomponent.classes -->

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Print out the bare and style component css



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$name  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The name of the drawer  |  required  |
$size  |  **{ Number }**  |  The size of the drawer  |  optional  |  400px
$side  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The side of the drawer. Can be top left bottom or right  |  optional  |  left
$type  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The type of drawer. Can be push, slide or reveal  |  optional  |  push

### Example
```scss
	@use 'node_modules/@coffeekraken/drawer-webcomponent/index' as drawer-webcomponent;
@include drawer-webcomponent.classes(
	$name : menu,
	$side : right
);
@include drawer-webcomponent.element(content) {
	@include drawer-webcomponent.opened(menu) {
 	transform: scale(.9);
 }
}
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)