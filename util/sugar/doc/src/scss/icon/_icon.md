# icon

<!-- @namespace: sugar.scss.icon.icon -->

Type : **{ mixin }**


Apply an icon on the element. This mixin support font-awesome and custom icons systems that have an icon name formated like "icon-{name}"
The custom icon style if you pass as name "user" will extend %icon, %icon-user, .icon and .icon-user classes



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$name  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The icon name to apply  |  required  |
$color  |  **{ [Color](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#colors) }**  |  The color wanted for the icon  |  optional  |  null

### Example
```scss
	.my-cool-icon {
	@include sugar.icon(fa-user, primary);
}
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)