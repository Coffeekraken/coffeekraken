


<!-- @namespace    sugar.js.dom -->

# ```js inViewportStatusChange ```


Monitor when the passed element enter or exit the viewport

## Parameters

- **elm**  HTMLElement: The element to monitor



## Example (js)

```js
import inViewportStatusChange from '@coffeekraken/sugar/js/dom/inViewportStatusChange';
inViewportStatusChange(myElm).enter($elm => {
   // do something...
}).exit($elm => {
   // do something...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



