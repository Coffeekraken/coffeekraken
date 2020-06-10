


<!-- @namespace    sugar.js.dom -->

# ```js addEventListener ```


Add an event listener on an element and return the function to remove the event listener

## Parameters

- **$elm**  HTMLElement: The HTMLElement on which to add the event listener

- **eventName**  String: THe event name to listen to

- **callback**  Function: The callback function to call on event

- **options** ([object Object]) Object: An options object that specifies characteristics about the event listener



## Example (js)

```js
import addEventListener from '@coffeekraken/sugar/js/dom/addEventListener'
const removeEventListener = addEventListener($myCoolElm, 'click', this._myCoolFunction, this)
// remove the event listener
removeEventListener()
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



