
# Function


## ```js exitCleanup ```
### Since: 2.0.0

This function register a handler on process exit and try to clean all the child process, etc...

## Parameters

- **handler**  Function: A custom function to handle custom cleanup if you need. MUST return a promise that you have to resolve once the cleanup has been done

- **settings** ([object Object]) Object: An object of settings to configure your cleanup:
- childProcess (true) {Boolean}: Specify if you want to clean the child processes or not



## Example (js)

```js
const exitCleanup = require('@coffeekraken/sugar/node/process/exitCleanup');
exitCleanup();
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



