


<!-- @namespace    sugar.node.blessed.list -->

# ```js summaryListPopup ```


This function init and display a summary list popup and return an SPromise instance on which you can subscribe for response, etc...

## Parameters

- **settings** ([object Object]) Object: A simple settings object to configure your summary list popup



## Example (js)

```js
const summaryListPopup = require('@coffeekraken/sugar/node/blessed/list/summaryListPopup');
summaryListPopup({
   title: 'Hello',
   description: 'World',
   items: [{
      id: 'port',
      text: 'Server port',
      default: 8080
   }]
}).attachTo(myCoolBlessedParent);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



