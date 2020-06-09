
# Function


## ```js remove ```


Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing. Like rm -rf (async)

## Parameters

- **path**  String: The file/directory path to delete



## Example (js)

```js
const remove = require('@coffeekraken/node/fs/remove');
remove('my/cool/file.json').then(() => {
   // do something on complete...
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



