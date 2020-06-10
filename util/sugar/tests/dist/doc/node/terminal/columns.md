


<!-- @namespace    sugar.node.terminal -->

# ```js columns ```


Display your content using columns. The number of columns is defined by the number of items in the content array

## Parameters

- **content**  Array: The columns content stored in an Array

- **settings** ([object Object]) Object: An object of settings descripbed above
- width (process.env.STDOUT_COLUMNS || process.stdout.columns) {Number}: The base width on which to calculate the columns
- padding (process.env.STDOUT_PADDING || 3) {Number}: The padding to apply on the sides


## Example (js)

```js
const columns = require('@coffeekraken/sugar/node/terminal/columns');
columns([
 'Hello world',
 'How are you?'
]);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



