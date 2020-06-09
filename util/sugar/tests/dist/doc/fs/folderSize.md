
# Function


## ```js folderSize ```


Calculate the size of the passed folder and return it through a promise, either in raw format, either in human readdable one...

## Parameters

- **folderPath**  String: The folder path to calculate the size

- **rawFormat**  Boolean: If true, will return the folder size in raw format



## Example (js)

```js
const folderSize = require('@coffeekraken/sugar/node/fs/folderSize');
folderSize('my/cool/folder').then((size) => {
     // do something...
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



