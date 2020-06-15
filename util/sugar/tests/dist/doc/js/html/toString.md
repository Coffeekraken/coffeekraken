


<!-- @namespace    sugar.js.html -->
<!-- @name    toString -->

# ```js toString ```


Return the string version of a dom node or the dom node and his children

## Parameters

- **html**  HTMLElement: The HTMLElement to convert to string

- **deep** (true) Boolean: Include or not his children



## Example (js)

```js
import toString from '@coffeekraken/sugar/js/string/toString'
const myDomNode = document.querySelector('.my-dom-node')
toString(myDomNode, false) // <div class="my-dom-node"></div>
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



