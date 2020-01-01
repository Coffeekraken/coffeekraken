# classes

<!-- @namespace: notification-webcomponent.classes -->

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Print out the classes for notifications styling



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$colors  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The registered colors to generate  |  optional  |  default primary secondary

### Example
```scss
	@include notification-webcomponent.classes(
	$colors : default primary secondary
);
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


## Mixins


### classes-bare

<!-- @namespace: notification-webcomponent.classes-bare -->

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Print out the bare classes for notifications styling


#### Example
```scss
	@include notification-webcomponent.classes-bare();
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### classes-style

<!-- @namespace: notification-webcomponent.classes-style -->

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Print out the style classes for notifications styling



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$colors  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The registered colors to generate  |  optional  |  default primary secondary

#### Example
```scss
	@include notification-webcomponent.classes-style(
	$colors : default primary secondary
);
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### classes-animation

<!-- @namespace: notification-webcomponent.classes-animation -->

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Print out the animation classes for notifications styling


#### Example
```scss
	@include notification-webcomponent.classes-animation();
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)