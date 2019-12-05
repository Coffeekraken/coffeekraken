# color-transparentize

<!-- @namespace: sugar.scss.color.color-transparentize -->

Makes $color more transparent.
The $amount must be a number between 0 and 1 (inclusive). Decreases the alpha channel of $color by that amount.



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$color  |  **{ [Color](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#colors) }**  |  The color to process  |  required  |
$amount  |  **{ Number }**  |  The amount to transparentize the color. Must be between 0 and 1  |  required  |

### Example
```scss
	sugar.color-transparentize(rgba(#036, 0.3), 0.3); // => rgba(0, 51, 102, 0)
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)