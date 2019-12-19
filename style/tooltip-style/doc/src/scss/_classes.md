# classes

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Print out the bare and style tooltip css
Generated classes:
- `.tooltip`
- `.tooltip--tl`
- `.tooltip--t`
- `.tooltip--tr`
- `.tooltip--l`
- `.tooltip--r`
- `.tooltip--bl`
- `.tooltip--b`
- `.tooltip--br`
- `.tooltip--c`
- `.tooltip--{color}`
- `.tooltip--active, .tooltip.active, .tooltip[active], :hover > .tooltip, .active > .tooltip, [active] > .tooltip`



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$color  |  **{ List<Color> }**  |  The colors to generate  |  optional  |  default primary secondary
$sides  |  **{ List<String> }**  |  The sides to generate  |  optional  |  tl t tr l r bl b br c

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


## Mixins


### classes-bare

Type : **{ [Mixin](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) }**


Print out the bare tooltip css
Generated classed
- `.tooltip`
- `.tooltip--tl`
- `.tooltip--t`
- `.tooltip--tr`
- `.tooltip--l`
- `.tooltip--r`
- `.tooltip--bl`
- `.tooltip--b`
- `.tooltip--br`
- `.tooltip--c`
- `.tooltip.active, .tooltip[active], :hover > .tooltip, .active > .tooltip, [active] > .tooltip`



#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$sides  |  **{ List<String> }**  |  The sides to generate  |  optional  |  tl t tr l r bl b br c

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)


### classes-style

Print out the style tooltip css
Generated classes:
- `.tooltip`
- `.tooltip--tl`
- `.tooltip--t`
- `.tooltip--tr`
- `.tooltip--l`
- `.tooltip--r`
- `.tooltip--bl`
- `.tooltip--b`
- `.tooltip--br`
- `.tooltip--c`
- `.tooltip--{color}`
- `.tooltip--active, .tooltip.active, .tooltip[active], :hover > .tooltip, .active > .tooltip, [active] > .tooltip`


#### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$color  |  **{ List<Color> }**  |  The colors to generate  |  optional  |  default primary secondary
$sides  |  **{ List<String> }**  |  The sides to generate  |  optional  |  tl t tr l r bl b br c