


<!-- @namespace    sugar.js.dom -->

# ```js innerHtml ```


Change the content of a Node with the possibility to animate the change using one of these animations:
- fade
- fadeUp
- fadeDown
- fadeLeft
- fadeRight
You can also choose between 3 actions which are: replace, append and prepend

## Parameters

- **node**  HTMLElement: The node to change to content of

- **content**  String: The new content of the node

- **settings** ([object Object]) Object: The settings to change the content like 'animIn', 'animOut', and more...



## Example (js)

```js
import innerHtml from '@coffeekraken/sugar/js/dom/innerHtml'
innerHtml(myCoolNode, 'Hello World', {
   action: 'replace', // replace, append, prepend
   animIn: 'fade', // fade, fadeUp, fadeDown, fadeLeft, fadeRight
   animOut: 'fadeUp', // fade, fadeUp, fadeDown, fadeLeft, fadeRight
   animInDuration: 600, // in ms if number, otherwise a string like '1s', '1m', etc...
   animOutDuration: 300, // in ms if number, otherwise a string like '1s', '1m', etc...
   animInDistance: 25, // in px
   animOutDistance: 25, // in px
   animInEasing: 'ease-in-out',
   animOutEasing: 'ease-in-out'
}).then(() => {
   // do something when the change has been made...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



