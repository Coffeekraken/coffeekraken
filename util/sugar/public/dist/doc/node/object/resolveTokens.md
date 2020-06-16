


<!-- @namespace    sugar.js.object -->
<!-- @name    resolveTokens -->

# ```js resolveTokens ```


This function take an object and propare it to accept tokens like:
- '{this.something.else}'
- etc...

## Parameters

- **object**  Object: The object to process



## Example (js)

```js
import resolveTokens from '@coffeekraken/sugar/js/object/resolveTokens';
const myObj = resolveTokens({
   hello: 'world',
   plop: '{this.hello}
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



