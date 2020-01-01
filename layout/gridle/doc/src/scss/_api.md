# custom-class

<!-- @namespace: gridle.custom-class -->

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Generate custom class using gridle states



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$classname  |  **{ [String](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) }**  |  The classname to generate  |  required  |
$statesNames:states-names()  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  The states to generate  |  required  |

### Example
```scss
	my-cool-class,
 default tablet mobile
) {
   background: red;
}
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)