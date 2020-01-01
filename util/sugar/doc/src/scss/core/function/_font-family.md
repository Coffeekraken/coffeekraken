# font-family

<!-- @namespace: sugar.scss.core.function.font-family -->

Type : **{ function }**


Return the font-family string or a registered font



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$name  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The name of the registered font  |  required  |

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The corresponding font-family property to set in your css

### Example
```scss
	// register a font
@include sugar.setup((
		fonts : (
			myCoolFont : (
				font-family : 'Helvetica Neue',
				font-weight : 'bold',
				// etc...
			),
			// other fonts...
		)
));

// apply the font
.my-cool-element {
		font-family : sugar.font-family(myCoolFont);
		// 'Helvetica Neue';
}
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)