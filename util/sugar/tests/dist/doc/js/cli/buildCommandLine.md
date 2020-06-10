


<!-- @namespace    sugar.js.cli -->

# ```js buildCommandLine ```
### Since: 2.0.0

This function takes as parameters a command line (with tokens), an arguments object and a definition object to
generate the final command line string to launch.
A token is simply a string that begin with "[" and end with "]" like so: "[mytoken]".
Each arguments of the definition object can be a token. If you have an argument called "hostname", the corresponding token will be "[hostname]".
A special token called "[arguments]" is needed if you want the passed arguments to be integrated to the builded command line.

## Parameters

- **command**  String: The tokenized command line to use as base

- **definitionObj**  Object: The definition object of the command to launch

- **args** ([object Object]) Object: An optional arguments/values object to override definition default value

- **includeAllArgs** (true) Boolean: Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument



## Example (js)

```js
import buildCommandLine from '@coffeekraken/sugar/js/cli/buildCommandLine';
buildCommandLine('php [hostname]:[port] [rootDir] [arguments]', {
   hostname: {
     type: 'String',
     description: 'Server hostname',
     default: 'localhost'
   },
   port: {
     type: 'Number',
     description: 'Server port',
     default: 8080
   },
   rootDir: {
     type: 'String',
     description: 'Root directory',
     default: '.'
   },
   arg1: {
     type: 'Boolean',
     alias: 'a',
     description: 'Argument 1',
     default: true
   }
}, {
   port: 8888
});
// => php localhost:8888 . -a
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



