


<!-- @namespace    sugar.js.html -->

# ```js striptags ```


Strip tags of an html string.
This is a simple wrapper of the nice "striptags" package that you can find here: https://www.npmjs.com/package/striptags

## Parameters

- **html**  String: The html string to process

- **allowableTags**  String: The tags that are allowed like <h1><h2>...

- **tagReplacement**  String: A string with which you want to replace the tags



## Example (js)

```js
import striptags from '@coffeekraken/sugar/js/string/striptags'
striptags('<p><span>Hello</span> world</p>', '<span>') // <span>Hello</span> world
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



