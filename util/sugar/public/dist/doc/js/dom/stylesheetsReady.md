


<!-- @namespace    sugar.js.dom -->
<!-- @name    stylesheetsReady -->

# ```js stylesheetsReady ```


Wait until all the HTMLLinkElement's are properly loaded

## Parameters

- **links**  Array<HTMLLinkElement>: The HTMLLinkElement tags to process

- **cb**  Function: An optional callback function to call when all the links are loaded



## Example (js)

```js
import stylesheetsReady from '@coffeekraken/sugar/js/dom/stylesheetsReady'
stylesheetsReady([
		myHTMLLinkElement1,
		myHTMLLinkElement2
]).then(() => {
		// do something when all the links are loaded
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



