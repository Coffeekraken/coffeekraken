# context-setup

<!-- @namespace: sugar.scss.core.mixin.context-setup -->

Type : **{ mixin }**


Register a context with a name to use it later



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$name  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The context name  |  required  |
$settings  |  **{ [Map](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) }**  |  The settings to override for this context  |  required  |

### Example
```scss
	@include sugar.context-setup(my-cool-context, (
		look-and-feel : (
			padding-vertical : (
				default : 0.6em
			)
		)
));

// using your context
@include sugar.context(my-cool-context) {
		sugar.look-and-feel(padding-vertical); // => 0.6em
}
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)