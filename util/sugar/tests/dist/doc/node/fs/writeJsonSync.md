


<!-- @namespace    sugar.node.fs -->
<!-- @name    writeJsonSync -->

# ```js writeJsonSync ```


Write a JSON file. If don't exist, will be created as well as the directory structure if needed... (sync)

## Parameters

- **path**  String: The file path to write

- **object**  String: The object to write in the JSON file

- **options** ([object Object]) Object: options are what you'd pass to [fs.writeJsonSync()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)



## Example (js)

```js
const writeJsonSync = require('@coffeekraken/node/fs/writeJsonSync');
try {
   writeJsonSync('my/cool/file.json', { hello: 'world' });
} catch(e) {}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



