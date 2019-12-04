# is-unitless

<!-- @namespace: sugar.scss.meta.is-unitless -->

Type : **{ function }**


Check if the passed variable is unitless or not



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$number  |  **{ Number }**  |  The number to check  |  required  |

Return **{ Boolean }** true if unitless, false if not

### Example
```scss
	sugar.is-unitless(20); // => true
sugar.is-unitless(10px); // => false
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)