
# Function


## ```js center ```


Allow to center one or more lines in the terminal depending on the process.env.STDOUT_PADDING environment variable
Settings:
- spaceChar (~) {String}: Which character to consider as a space that will be replaced by an actual space

## Parameters

- **text**  String,Array: The text to center or array of strings to center

- **settings** ([object Object]) Object: An object of settings



## Example (js)

```js
const center = require('@coffeekraken/sugar/node/terminal/center');
center('Hello world'); // => '                 Hello world'
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



