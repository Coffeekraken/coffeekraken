
# Function


## ```js initEnv ```


Init the node environment by initialising "dotenv", "envinfo" and beautify the errors display.

- dotenv: Load the environment variables from ".env" file into process.env stack
- envinfo: Store an object of the environment on which the script is running like the CPU, node version, etc...
--- The object will be stored in the process.env.ENV_INFO
- package.json: Store the package.json content inside the process.env.PACKAGE variable



## Example (js)

```js
const initEnv = require('@coffeekraken/sugar/node/dev/initEnv');
initEnv();
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



