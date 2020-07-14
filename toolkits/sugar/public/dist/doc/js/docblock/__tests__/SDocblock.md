


<!-- @namespace    sugar.js.docblock -->
<!-- @name    DockblockParser -->

# ```js DockblockParser ```
### Since: 2.0.0

This is the main class that expose the methods like "parse", etc...
You have to instanciate it by passing a settings object. Here's the available options:



## Example (js)

```js
import SDocblockParser from '@coffeekraken/sugar/js/docblock/SSDocblockParser';
new SDocblockParser({
   // override some settings here...
}).parse(myString);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods


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



<!-- @namespace    sugar.js.string -->
<!-- @name    includes -->

# ```js includes ```


Same as the native String.includes function but accept either an array of items
or a simple comma separated string like "something,cool,hello,world"

## Parameters

- **string**  String: The string to check

- **values**  Array,String: An array or comma separated string to check



## Example (js)

```js
import includes from '@coffeekraken/sugar/js/string/includes'
includes('Hello world', 'world,coco') // ['world']
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables



<!-- @name    definitionObj -->

# Static get ```js definitionObj ```


Store the definition object



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

