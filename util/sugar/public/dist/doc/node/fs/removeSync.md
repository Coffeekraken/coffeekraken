


<!-- @namespace    sugar.node.fs -->
<!-- @name    removeSync -->

# ```js removeSync ```


Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing. Like rm -rf (sync)

## Parameters

- **path**  String: The file/directory path to delete



## Example (js)

```js
const removeSync = require('@coffeekraken/node/fs/removeSync');
try {
   removeSync('my/cool/file.json');
} catch(e) {}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



