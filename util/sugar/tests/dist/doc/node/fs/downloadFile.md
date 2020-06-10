


<!-- @namespace    sugar.node.fs -->

# ```js downloadFile ```


Download a file and save it on the file system

## Parameters

- **downloadUrl**  String: The absolute url to the file that you want to download

- **destinationPath** (__downloadsFolder()) String: The path where you want to save the file. Can be a simple directory path or an absolute file path with the file name and the extension

- **callback**  Function: A callback function to call on success or on error. In case of success it will take as parameter the final file path on the file system, otherwise it will be the error passed



## Example (js)

```js
const downloadFile = require('@coffeekraken/node/fs/downloadFile');
downloadFile('https://myCoolFileUrl.ch/coco.json').then((dest) => {
   console.log('file downloeaded and saved here', dest);
}).catch(err) => {});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



