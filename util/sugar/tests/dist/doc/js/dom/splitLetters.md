


<!-- @namespace    sugar.js.dom -->

# ```js splitLetters ```


Split each letters inside an HTMLElement by scoping them inside multiple tags.
Here's an result sample for : Hello World
```html
<span style="white-space:nowrap">
<span class="split-letters">
<span class="split-letters__letter">H</span>
</span>
<span class="split-letters">
<span class="split-letters__letter">e</span>
</span>
<span class="split-letters">
<span class="split-letters__letter">l</span>
</span>
<span class="split-letters">
<span class="split-letters__letter">l</span>
</span>
<span class="split-letters">
<span class="split-letters__letter">o</span>
</span>
</span>
<span class="split-letters">
<span class="split-letters__letter">&nbsp;</span>
</span>
<span style="white-space:nowrap">
<span class="split-letters">
<span class="split-letters__letter">W</span>
</span>
<span class="split-letters">
<span class="split-letters__letter">o</span>
</span>
<span class="split-letters">
<span class="split-letters__letter">r</span>
</span>
<span class="split-letters">
<span class="split-letters__letter">l</span>
</span>
<span class="split-letters">
<span class="split-letters__letter">d</span>
</span>
</span>
```

## Parameters

- **elm**  HTMLElement: The HTMLElement to split letters in

- **tag** (span) String: The tag to use to split the letters

- **tagClass** (s-split-letters) String: The class to apply on the tags



## Example (js)

```js
import __splitLetters from '@coffeekraken/sugar/js/dom/splitLetters'
const myCoolElement = document.querySelector('.my-cool-element');
__splitLetters(myCoolElement);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



