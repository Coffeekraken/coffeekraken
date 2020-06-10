


<!-- @namespace    sugar.js.dom -->

# ```js whenAttribute ```


Resolve a promise when the wanted attribute on the passed HTMLElement exist or pass the check function provided

## Parameters

- **elm**  HTMLElement: The HTMLElement on which to monitor the property

- **attribute**  String: The attribute to monitor

- **checkFn**  Function: An optional function to check the attribute. The promise is resolved when this function return true



## Example (js)

```js
import whenAttribute from '@coffeekraken/sugar/js/dom/whenAttribute'
whenAttribute(myCoolHTMLElement, 'value').then((value) => {
		// the value attribute exist on the element
});
// with a checkFn
whenAttribute(myCoolHTMLElement, 'value', (newVal, oldVal) => {
		// make sure the value is a number
		return typeof(newVal) === 'number';
}).then((value) => {
		// do something with your number value...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



