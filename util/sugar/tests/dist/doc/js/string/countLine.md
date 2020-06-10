


<!-- @namespace    sugar.js.string -->

# ```js countLine ```


Count how many characters their is in the passed line.
This function will exclude the characters like the html tags like <red>, etc...

## Parameters

- **line**  String: The line to count

- **count** ([object Object]) Object: Specify what you want to count outside of the normal characters of yourse. Here's the list of available options:
- htmlTags (false) {Boolean}: Specify if you want to count the html tags or not
- terminalSpecialChars (false) {Boolean}: Specify if you want to count the terminal specials chars like "\u001b[30m", etc...
- newLineChars (false) {Boolean}: Specify if you want to count the new line special char "\n" or not


## Example (js)

```js
const countLine = require('@coffeekraken/sugar/js/string/countLine');
countLine('Hello <red>World</red>'); // 11
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



