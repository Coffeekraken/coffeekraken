


<!-- @namespace    sugar.js.dom -->

# ```js splitLines ```


Split each lines inside an HTMLElement by scoping them inside some tags.
Here's an result sample for :
Hello
World

```html
<p class="s-split-lines">Hello</p>
<p class="s-split-lines">World</p>
```

## Parameters

- **elm**  HTMLElement: The HTMLElement to split lines in

- **tag** (p) String: The tag to use to split the lines

- **tagClass** (s-split-lines) String: The class to apply on the tags



## Example (js)

```js
import splitLines from '@coffeekraken/sugar/js/dom/splitLines'
const myCoolElement = document.querySelector('.my-cool-element');
splitLines(myCoolElement);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



