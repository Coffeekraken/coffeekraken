
# Function


## ```js splitLineEvery ```


Split a line every x characters but does not count the characters like \u011b and the tags like <red> etc...

## Parameters

- **line**  String: The line to split

- **every**  Number: Every hoe many characters to split the line



## Example (js)

```js
const splitLineEvery  = require('@coffeekraken/sugar/node/terminal/splitLineEvery');
splitLineEvery('Hello <red>world</red> how are you?', 5);
// ['Hello ', 'world', ' how ', 'are y', 'ou?']
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



