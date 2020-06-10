


<!-- @namespace    sugar.node.github -->

# ```js listFolder ```


List a github folder and return the JSON formated github API response

## Parameters

- **repo**  String: The repository name that you want to list the folder in

- **path**  String: The path inside the repository to the folder that you want to list



## Example (js)

```js
const listFolder = require('@coffeekraken/node/github/listFolder');
listFolder('Coffeekraken/coffeekraken', 'style/button-style').then((response) => {
   console.log('response', response);
}).catch((error) => {});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



