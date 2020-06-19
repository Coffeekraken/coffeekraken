# opened

<!-- @namespace: drawer-webcomponent.opened -->

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Target an opened drawer



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$name  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The name of the drawer to target  |  optional  |  s-drawer-current-name()

### Example
```scss
	@use 'node_modules/@coffeekraken/drawer-webcomponent/index' as drawer-webcomponent;
@include drawer-webcomponent.opened(menu) {
 	@include drawer-webcomponent.element(content) {
 	 	transform: scale(.5);
 	}
}
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


## Mixins


### element

<!-- @namespace: drawer-webcomponent.element -->

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Specify a drawer element to style
Here's the list of available elements:
- ```drawer``` : the drawer itself
- ```overlay``` : the overlay that will be displayed over the content
- ```toggle``` : the toggle input
- ```bkg``` : the background
- ```content``` : the element that has the s-drawer-content" attribute



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$element  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The element to style. Can be drawer, overlay, toggle, bkg or content  |  optional  |  drawer
$name  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The name of the drawer to target  |  optional  |  s-drawer-current-name()

#### Example
```scss
	@use 'node_modules/@coffeekraken/drawer-webcomponent/index' as drawer-webcomponent;
@include drawer-webcomponent.element(drawer) {
 	background: sugar.color(secondary);
 	color: white;
}
@include drawer-webcomponent.element(overlay) {
		background: sugar.color(secondary, -opacity .5);
}
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)