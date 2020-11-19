# splitLines

<!-- @namespace: sugar.js.dom.splitLines -->

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**


Split each lines inside an HTMLElement by scoping them inside some tags.
Here's an result sample for :
Hello
World

```html
<p class="s-split-lines">Hello</p>
<p class="s-split-lines">World</p>
```



### Parameters
Name  |  Type  |  Description  |  Status  |  Default
------------  |  ------------  |  ------------  |  ------------  |  ------------
elm  |  **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }**  |  The HTMLElement to split lines in  |  required  |
tag  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The tag to use to split the lines  |  optional  |  "p"
tagClass  |  **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**  |  The class to apply on the tags  |  optional  |  "s-split-lines"

Return **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }** The HTMLElement processed

### Example
```js
	import splitLines from '@coffeekraken/sugar/js/dom/splitLines'
const myCoolElement = document.querySelector('.my-cool-element');
splitLines(myCoolElement);
```
Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com) [https://olivierbossel.com](https://olivierbossel.com)