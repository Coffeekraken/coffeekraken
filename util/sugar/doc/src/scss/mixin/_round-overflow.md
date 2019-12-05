# round-overflow

<!-- @namespace: sugar.scss.mixin.round-overflow -->

Type : **{ mixin }**


Apply some css to have a rounded element with already an overflow on it



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$size  |  **{ Number }**  |  The size (width and height) of the element wanted  |  optional  |  null
$width  |  **{ Number }**  |  The width of the element wanted  |  optional  |  null
$height  |  **{ Number }**  |  The height of the element wanted  |  optional  |  null

### Example
```scss
	.my-cool-image {
	@include sugar.round-overflow(100px);

	img {
		@include sugar.size(cover);
	}
}
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)