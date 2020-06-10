


<!-- @namespace    sugar.js.log -->

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




# ```js constructor ```


Constructor

## Parameters

- **settings** ([object Object]) Object: The settings object to configure your SLogConsoleAdapter instance. Here's the settings available:
- logMethods ({}) {Object}: Store all the console methods like "log", "info", "warn", "debug" and "error". You can override each methods with your own method if you want. The Object format is { methodName: overrideFunction }




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js log ```


This is the main method of the logger. It actually log the message passed as parameter to the console

## Parameters

- **message**  Mixed: The message to log

- **level**  String: The log level. Can be "log", "info", "error", "debug" or "warn"



## Example (js)

```js
await consoleAdapter.log('hello world');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _settings ```


Store this instance settings. Here's the list of available settings
- logMethods ({}) {Object}: Store all the console methods like "log", "info", "warn", "debug" and "error". You can override each methods with your own method if you want. The Object format is { methodName: overrideFunction }



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

