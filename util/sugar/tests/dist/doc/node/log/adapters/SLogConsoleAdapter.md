


<!-- @namespace    sugar.js.log -->
<!-- @name    SLogConsoleAdapter -->

# ```js SLogConsoleAdapter ```


This class allows you to log your messages, errors, etc... easily through some adapters that cover some targets like "console" of course,
"mail", "slack", etc...



## Example (js)

```js
import SLog from '@coffeekraken/sugar/js/log/SLog';
import SLogConsoleAdapter from '@coffeekraken/sugar/js/log/adapters/SLogConsoleAdapter';
const logger = new SLog({
   adapters: [
     new SLogConsoleAdapter()
   ]
});
logger.log('Something cool happend...');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



## Variables


