


<!-- @namespace    sugar.js.dom -->
<!-- @name    when -->

# ```js when ```


Return a promise that will be resolved when the wanted status has been applied on the passed HTMLElement.
The status that can be requested are:
- attribute : Detect when a special attribute has been applied on the element
--- settings.attribute : Specify the attribute to check
--- settings.checkFn : An optional function to check the attribute. The promise is resolved when this function return true

- inViewport : Detect when the element enter in the viewport
--- settings.offset : Specify an offset to detect the in viewport state

- outOfViewport : Detect when the element exit the viewport
--- settings.offset : Specify an offset to detect the out viewport state

- transitionEnd : Detect when the css transition is finished on the element
--- settings.callback : An optional callback function if you prefer instead of the promise

- visible : Detect when the element become visible
--- settings.callback : An optional callback function if you prefer instead of the promise

## Parameters

- **$node**  HTMLElement: The HTMLElement to check

- **state**  String: The state to check on the HTMLElement

- **settings** ([object Object]) Object: The settings to configure the check process



## Example (js)

```js
import when from '@coffeekraken/sugar/js/dom/when';
when(myCoolNode, 'inViewport').then(() => {
   // do something...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



