


<!-- @namespace    sugar.node.fs -->
<!-- @name    writeJson -->

# ```js writeJson ```


Write a JSON file. If don't exist, will be created as well as the directory structure if needed... ( (async)

## Parameters

- **path**  String: The file path to write

- **object**  String: The object to write in the JSON file

- **options** ([object Object]) Object: options are what you'd pass to [fs.writeJson()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)



## Example (js)

```js
const writeJson = require('@coffeekraken/node/fs/writeJson');
writeJson('my/cool/file.json', { hello: 'world' }).then(() => {
   // do something on complete...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



