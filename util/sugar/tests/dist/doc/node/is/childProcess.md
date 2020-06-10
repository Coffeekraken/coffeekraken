


<!-- @namespace    sugar.node.is -->

# ```js childProcess ```


Check if the current script is running as a child process or not by checking if the ```process.send``` exists, or is the environment variable ```IS_CHILD_PROCESS``` is true.



## Example (js)

```js
const isChildProcess = require('@coffeekraken/sugar/node/is/childProcess');
isChildProcess(); // => false
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



