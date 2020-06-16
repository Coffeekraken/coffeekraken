


<!-- @namespace    sugar.js.dom -->
<!-- @name    wrap -->

# ```js wrap ```


Wrap an HTMLElement inside another `$wrapper` one

## Parameters

- **$toWrap**  HTMLElement: The element to wrap

- **$wrapper**  HTMLElement: The wrapper element



## Example (js)

```js
import wrap from '@coffeekraken/sugar/js/dom/wrap'
const $wrapper = document.createElement('div')
// assuming:
// <div>
//   <span class="wrap">Hello World</span>
// </div>
wrap(document.querySelector('.wrap'), $wrapper)
// output:
// <div>
//   <div>
//     <span class="wrap">Hello World</span>
//   </div>
// </div>
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



