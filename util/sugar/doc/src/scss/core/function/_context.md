# context

<!-- @namespace: sugar.scss.core.function.context -->

Type : **{ function }**

Return the name of the context setted with the [../mixins/_context.scss] mixin



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$default  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The name to return if no context exist  |  optional  |  null

Return **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }** The context name

### Example
```scss
	// register a context
@include sugar.context-setup('my-context', (
		// override some settings here...
));

sugar.context('hello') // => 'hello'
@include sugar.context('my-context') {
		sugar.context('hello') // => 'my-context'
}
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)