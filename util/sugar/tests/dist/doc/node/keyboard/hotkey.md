


<!-- @namespace    sugar.node.keyboard -->

# ```js hotkey ```


This function allows you to add keyboard listening process and subscribe to some sequences
using the SPromise instance returned.

## Parameters

- **hotkey**  String: The hotkey to detect

- **settings** ([object Object]) Object: An option object to configure your hotkey. Here's the list of available settings:
- once (false) {Boolean}: Specify if you want to detect the keyboard event just once
- splitKey (+) {String}: Specify the split key to use in the sequences like "ctrl+a"


## Example (js)

```js
const hotkey = require('@coffeekraken/sugar/node/keyboard/hotkey');
const promise = hotkey('ctrl+a').on('key', (e) => {
   // do something...
});
promise.cancel();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



