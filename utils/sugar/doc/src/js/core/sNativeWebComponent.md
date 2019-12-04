# sNativeWebComponent

<!-- @namespace: sugar.js.core.sNativeWebComponent -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Extend a native web element to create a new web component



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
HTMLElementToExtend  |  **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }**  |  The HTML element to use as web component base  |  required  |

Return **{ Class }** The extended base class to create the new web component with

### Example
```js
	import native from "@coffeekraken/sugar/js/core/sNativeWebComponent";
export default class MyCoolComponent extends native(HTMLVideoElement) {
   // your component integration...
}
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)

Default : **{}**