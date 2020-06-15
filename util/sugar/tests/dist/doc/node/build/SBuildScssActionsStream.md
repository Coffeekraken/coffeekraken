


<!-- @namespace    sugar.node.build -->
<!-- @name    SBuildScssActionsStream -->

# ```js SBuildScssActionsStream ```
### Since: 2.0.0

This class represent a pre-configured action stream to build easily some javascript files

## Parameters

- **settings** ([object Object]) Object: The settings object to configure your instance



## Example (js)

```js
const SBuildScssActionsStream = require('@coffeekraken/sugar/node/build/SBuildScssActionsStream');
const myStream = new SBuildScssActionsStream();
myStream.start({
   input: '...',
   outputDir: '...'
}).on('resolve', (result) => {
   // do something
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    constructor -->

# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables


