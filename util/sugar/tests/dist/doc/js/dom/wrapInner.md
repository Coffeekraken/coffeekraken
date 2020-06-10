


<!-- @namespace    sugar.js.dom -->

# ```js wrapInner ```


Wrap the content of the passed `$parent` inside a the passed HTMLElement `$wrapper`

## Parameters

- **$parent**  HTMLElement: The parent to wrap inner

- **$wrapper**  HTMLElement: The wrapper element



## Example (js)

```js
import wrapInner from '@coffeekraken/sugar/js/dom/wrapInner'
const $myWrapper = document.createElement('div')
// assuming
// <div class="container">
//   <span>Hello World</span>
// </div>
wrapInner(document.querySelector('.container'), $myWrapper)
// return
// <div class="container">
//   <div>
//     <span>Hello World</span>
//   </div>
// </div>
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



