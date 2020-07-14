# icons

<!-- @namespace: sugar.scss.icon.icons -->

Type : **{ mixin }**


Generate some icon classes like .icon-$icon-name



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$icons-names  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The list of icons names to generate  |  required  |
$color  |  **{ [Color](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#colors) }**  |  The color wanted for the generated icons  |  optional  |  null

### Example
```scss
	@include sugar.icons(fa-user fa-bell fa-circle);
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)