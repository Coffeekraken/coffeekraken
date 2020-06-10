


<!-- @namespace    sugar.node.github -->

# ```js downloadFolder ```


Provide the ability to download all the files in a particular folder of a specific repository

## Parameters

- **repo**  String: The repository name (path) in which live the folder that you want to download

- **path**  String: The folder path that you want to download

- **destinationPath** (__downloadsFolder()) String: The folder in which you want to save the downloaded one



## Example (js)

```js
const downloadFolder = require('@coffeekraken/sugar/node/github/downloadFolder');
downloadFolder('Coffeekraken/coffeekraken', 'style/button-style').then((response) => {
   console.log('response', response);
}).catch((error) => { console.log(error); });
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



