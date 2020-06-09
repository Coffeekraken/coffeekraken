
# Class


## ```js SBuildJsActionsStream ```
### Since: 2.0.0

This class represent a pre-configured action stream to build easily some javascript files

## Parameters

- **settings** ([object Object]) Object: The settings object to configure your instance



## Example (js)

```js
const SBuildJsActionsStream = require('@coffeekraken/sugar/node/build/SBuildJsActionsStream');
const myStream = new SBuildJsActionsStream();
myStream.start({
   input: '...',
   output: '...'
}).on('resolve', (result) => {
   // do something
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js constructor ```


Constructor




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Variables


