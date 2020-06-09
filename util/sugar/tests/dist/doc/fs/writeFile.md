
# Function


## ```js writeFile ```


CWrite a file. If don't exist, will be created as well as the directory structure if needed... ( (async)

## Parameters

- **path**  String: The file path to write

- **data**  String: The data to write in the file

- **options** ([object Object]) Object: options are what you'd pass to [fs.writeFile()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)



## Example (js)

```js
const writeFile = require('@coffeekraken/node/fs/writeFile');
writeFile('my/cool/file.txt', 'Hello World').then(() => {
   // do something on complete...
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



