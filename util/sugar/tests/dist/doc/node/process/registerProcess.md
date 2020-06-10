


<!-- @namespace    sugar.node.process -->

# ```js registerProcess ```
### Since: 2.0.0

This function register a (child) process in a global stack.
You can access these registered processes using the "getRegisteredProcesses" function.

## Parameters

- **pro**  Process: The process you want to register

- **name**  String: A specific name for your process. By default a uniqid will be generated



## Example (js)

```js
const registerProcess = require('@coffeekraken/sugar/node/process/registerProcess');
registerProcess(childProcess.exec('ls -la'));
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



