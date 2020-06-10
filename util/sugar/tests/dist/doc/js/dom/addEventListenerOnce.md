


<!-- @namespace    sugar.js.dom -->

# ```js addEventListenerOnce ```


Add an event listener that will be trigerred only once

## Parameters

- **$elm**  HTMLElement: The element to add the event listener on

- **event**  String: The event to listen for

- **callback**  Function: The callback function to call on event

- **options** ([object Object]) Object: An options object that specifies characteristics about the event listener



## Example (js)

```js
import addEventListenerOnce from '@coffeekraken/sugar/js/dom/addEventListenerOnce'
addEventListenerOnce(myElm, 'click', (e) => {
    // do something on click
});
addEventListenerOnce(myElm, 'click').then(e => {
   // do something on click
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



