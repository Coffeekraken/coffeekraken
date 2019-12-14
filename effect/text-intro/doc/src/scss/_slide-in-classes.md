# slide-in-classes

<!-- @namespace: text-intro.slide-in-classes -->

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Provide the classes for the intro="slide-in-{direction}" intro
- `[intro="slide-in-up"]`
- `[intro="slide-in-right"]`
- `[intro="slide-in-bottom"]`
- `[intro="slide-in-left"]`
- `[intro="slide-in-{direction}"].active, [intro="slide-in-{direction}"][active]`
- `[intro-activator] [intro="slide-in-{direction}"], [intro-activator].active [intro="slide-in-{direction}"], [intro-activator][active] [intro="slide-in-{direction}"]`



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$offset  |  **{ Number }**  |  Specify the distance that the element is gonna slide  |  optional  |  50px
$directions  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  Specify the directions to generate the classes for  |  optional  |  up right down left

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


## Mixins


### slide-in-bare

<!-- @namespace: text-intro.slide-in-bare -->

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Provide the bare styling for the anim="slide-in-{direction}" classes


Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### slide-in-style

<!-- @namespace: text-intro.slide-in-style -->

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Provide the style styling for the anim="slide-in-{direction}" classes
- `[intro="slide-in-up"]`
- `[intro="slide-in-right"]`
- `[intro="slide-in-bottom"]`
- `[intro="slide-in-left"]`
- `[intro="slide-in-{direction}"].active, [intro="slide-in-{direction}"][active]`
- `[intro-activator] [intro="slide-in-{direction}"], [intro-activator].active [intro="slide-in-{direction}"], [intro-activator][active] [intro="slide-in-{direction}"]`



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$offset  |  **{ Number }**  |  Specify the distance that the element is gonna slide  |  optional  |  50px
$directions  |  **{ [List](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) }**  |  Specify the directions to generate the classes for  |  optional  |  up right down left

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)