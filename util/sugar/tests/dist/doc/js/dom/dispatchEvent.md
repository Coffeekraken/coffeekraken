


<!-- @namespace    sugar.js.dom -->

# ```js dispatchEvent ```


Helper to quickly display an event with some optional data attached to it

## Parameters

- **$target**  HTMLElement: The element to dispatch the event from

- **name**  String: The event name to dispatch

- **data**  Mixed: The data to attache to the event



## Example (js)

```js
import dispatchEvent from '@coffeekraken/sugar/js/dom/dispatchEvent'
dispatchEvent(myCoolHTMLElement, 'myCoolEventName', {
		var1 : 'value1'
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



