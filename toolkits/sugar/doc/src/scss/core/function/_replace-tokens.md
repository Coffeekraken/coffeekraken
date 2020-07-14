# replace-tokens

<!-- @namespace: sugar.scss.core.function.replace-tokens -->

Type : **{ function }**


Search and replace tokens like colors #primary in a passed string, list or map
Supported tokens types :
1. Colors : #{colorName}


### Example
```scss
	sugar.replace-tokens(12px #primary hello #secondary); // > 12px #ddd hello #fff;
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)