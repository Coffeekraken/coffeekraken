# strip-units

<!-- @namespace: sugar.scss.meta.strip-units -->

Type : **{ function }**


Return a number without any units



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
$number  |  **{ Number }**  |  The number to process  |  required  |

Return **{ Number }** The number without units

### Example
```scss
	sugar.strip-units(12px); // => 12
sugar.strip-units(30rem); // => 30
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)