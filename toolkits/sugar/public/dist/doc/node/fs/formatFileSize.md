


<!-- @namespace    sugar.node.fs -->
<!-- @name    formatFileSize -->

# ```js formatFileSize ```


Transform into human readable string a file size from a number (float or integer) or string.
This function use the wonderfull "filesize" npm package under the houd.

## Parameters

- **size**  Number,String: The size to transform

- **settings** ([object Object]) Object: The "filesize" settings to customize the output



## Example (js)

```js
const formatFilesize = require('@coffeekraken/sugar/node/fs/formatFileSize');
formatFileSize(163931); // => 326.86 KB
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



