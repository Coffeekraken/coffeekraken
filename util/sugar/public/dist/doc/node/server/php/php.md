


<!-- @namespace    sugar.node.server.php -->
<!-- @name    php -->

# ```js php ```
### Since: 2.0.0

This function take care of starting a local php server on which you can subscribe for different "events"
through the returned SPromise api.

## Parameters

- **args** ([object Object]) Object: The args object to configure the build process. Check the PhpSCli class definition object for available arguments



## Example (js)

```js
const phpServer = require('@coffeekraken/sugar/node/server/php');
phpServer({

}).on('compiled', file => {
   // do something...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



