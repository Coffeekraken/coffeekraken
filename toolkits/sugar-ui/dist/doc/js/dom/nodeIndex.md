


<!-- @namespace    sugar.js.dom -->
<!-- @name    nodeIndex -->

# ```js nodeIndex ```


Return the inde of the passed node inside the html

## Parameters

- **node**  HTMLElement: The node to get the index for



## Example (js)

```js
import nodeIndex from '@coffeekraken/sugar/js/dom/nodeIndex'
// assuming:
// <li>item #1</li>
// <li class="match">item #2</li>
// <li>item #3</li>
nodeIndex(document.querySelector('.match')) // 1
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



