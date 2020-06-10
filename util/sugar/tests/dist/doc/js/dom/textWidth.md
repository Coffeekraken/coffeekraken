


<!-- @namespace    sugar.js.dom -->

# ```js textWidth ```


Get the text width in px of a passed string or the passed HTMLElement

## Parameters

- **source**  String,HTMLElement: The source to process



## Example (js)

```js
import textWidth from '@coffeekraken/sugar/js/dom/textWidth'
// text of an HTMLElement
const width = textWidth(myCoolHTMLElement);

// text directly (no font-size management so it's less accurate...)
const width = textWidth('Hello World');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



