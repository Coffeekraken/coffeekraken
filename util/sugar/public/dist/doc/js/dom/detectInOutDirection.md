


<!-- @namespace    sugar.js.dom -->
<!-- @name    detectInOutDirection -->

# ```js detectInOutDirection ```


Detect the mouse direction when entered on the passed element. The direction can be up, down, left or right and will be passed to the two callbacks available.
The first one is the `onIn` callback, and the second one is the `onOut`.

## Parameters

- **$elm**  HTMLElement: The element to listen for mouseover and mouseout on

- **onIn**  Function: The onIn callback. The direction and the $elm will be passed to it

- **onOut**  Function: The onOut callback. The direction and the $elm will be passed to it



## Example (js)

```js
import detectInOutDirection from '@coffeekraken/sugar/js/dom/detectInOutDirection'
const detect = detectInOutDirection(myElm).in(direction => {
   // do something...
}).out(direction => {
   // do something...
}).then(value => {
   // do something
   console.log(value); // => { action: 'in', direction: 'up' };
});

// cancel the detection process
detect.cancel();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



