


<!-- @namespace    sugar.node.process -->
<!-- @name    output -->

# ```js output ```
### Since: 2.0.0

This function simply take a SProcess compatible process instance and display the output
accordingly to the context where this process is running. If the output is in a childProcess,
it will just console.log the stdout.data, stderr.data, etc... to the terminal but if the
process is in the main terminal instance, it will be wrapped inside a blessed box instance
and displayed nicely.

## Parameters

- **proc**  SProcess: The process to display output for

- **settings** ([object Object]) Object: An object of blessed settings that will be passed to the main blessed.box instance



## Example (js)

```js
const output = require('@coffeekraken/sugar/node/process/output');
const spawn = require('@coffeekraken/sugar/node/process/spawn');
const proc = spawn('ls -la');
output(proc);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



