


<!-- @namespace    sugar.js.function -->
<!-- @name    debounce -->

# ```js debounce ```


This utils function allows you to make sure that a function that will normally be called
several times, for example during a scroll event, to be called only once after
the delay passed



## Example (js)

```js
import debounce from '@coffeekraken/sugar/js/function/debounce';
const myDebouncedFn = debounce(() => {
		// my function content that will be
		// executed only once after the 1 second delay
}, 1000);

document.addEventListener('scroll', (e) => {
		// call my debounced function
		myDebouncedFn();
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



