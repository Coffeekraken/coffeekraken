


<!-- @namespace    sugar.js.string -->

# ```js splitEvery ```


Split a string every n chars either by taking care of not spliting the words, or by simply spliting without any attention to that...

## Parameters

- **text**  String: The text to split

- **every**  Number: How many characters to split the text

- **splitWords**  Boolean: If you want to split the words or not...



## Example (js)

```js
const splitEvery = require('@coffeekraken/node/string/splitEvery');
splitEvery('Hello World', 2, true); // => ['He','ll','o ','Wo','rl','d']
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



