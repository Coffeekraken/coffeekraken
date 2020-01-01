# classes

<!-- @namespace: button-webcomponent.classes -->

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Provide all the classes of the button component like .btn, .btn--outline, etc...
- ```.btn```
- ```.btn--{color}```
- ```.btn--outline```
- ```.btn--link```
- ```.btn--block```



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$colors  |  **{ List<Color> }**  |  The colors to generate  |  optional  |  default primary secondary
$types  |  **{ List<String> }**  |  The button types to generate. Available: default outline link block hover disabled  |  optional  |  default outline link block hover disabled

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


## Mixins


### classes-bare

<!-- @namespace: button-webcomponent.classes-bare -->

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Provide the bare styling for the buttons classes
- ```.btn```
- ```.btn--block```



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$types  |  **{ List<String> }**  |  The button types to generate. Available: default outline link block hover disabled  |  optional  |  default outline link block hover disabled

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### classes-style

<!-- @namespace: button-webcomponent.classes-style -->

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Provide the style styling for the buttons classes
- ```.btn--{color}```
- ```.btn--outline```
- ```.btn--link```
- ```.btn:disabled```
- ```.btn--hover-{$color}```



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$colors  |  **{ List<Color> }**  |  The colors to generate  |  optional  |  default primary secondary
$types  |  **{ List<String> }**  |  The button types to generate. Available: default outline link block hover disabled  |  optional  |  default outline link block hover disabled

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)