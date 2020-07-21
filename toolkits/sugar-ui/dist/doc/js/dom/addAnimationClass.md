


<!-- @namespace    sugar.js.dom -->
<!-- @name    addAnimationClass -->

# ```js addAnimationClass ```


Add a class that trigger an animation and remove it at the end

## Parameters

- **$elm**  HTMLElement: The element to take care of

- **cls**  String,Array: The class or classes (Array) to apply



## Example (js)

```js
import addAnimationClass from '@coffeekraken/sugar/js/dom/addAnimationClass'
addAnimationClass(myElm, 'my-cool-class').then($elm => {
   // do something at the animation end...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



