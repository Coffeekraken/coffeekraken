


<!-- @namespace    sugar.js.log -->

# ```js SLog ```


This class allows you to log your messages, errors, etc... easily through some adapters that cover some targets like "console" of course,
"mail", "slack", etc...



## Example (js)

```js
import SLog from '@coffeekraken/sugar/js/log/SLog';
import SLogConsoleAdapter from '@coffeekraken/sugar/js/log/adapters/SLogConsoleAdapter';
const logger = new SLog({
   adapters: {
     console: new SLogConsoleAdapter()
   }
});
logger.log('Something cool happend...');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js constructor ```


Constructor

## Parameters

- **settings** ([object Object]) Object: The settings object to configure your SLog instance. Here's the settings available:
- adapters ({}) {Object}: An object of adapters that you want to use in this SLog instance. The format is { adapterName: adapterInstance, etc... }
- overrideNativeConsole (false) {Boolean}: This will override the console.log, warn, etc... methods
- adaptersByLevel ({}) (Object): Specify which adapter you want to use by level. Can be an Array like ['console','mail'] or a comma separated string like "console,mail". The object format is { adapterName: adaptersList }
- adaptersByEnvironment ({}) {Object}: Same as the "adaptersByLevel" but for the environments like "test", "development" or "production". The environment value is taken using the "sugar.js.core.env" function using the key "ENV" or "NODE_ENV"




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _overrideNativeConsole ```


Override the native console object to call the SLog methods instead of the normal once.
Store the native console inside the global/window variable called "nativeConsole"




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _log ```


Internal log method that make the actual call to all the adapters, etc...

## Parameters

- **...args**  Mixed: The actual message(s) to log or the level wanted like "log", "warn", "info", "debug" or "error"




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js log ```


The main log method that log a normal message

## Parameters

- **...args**  Mixed: The message(s) to log



## Example (js)

```js
await logger.log('Something cool');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js info ```


The info method that log a message with the "info" level

## Parameters

- **message**  Mixed: The message to log

- **adapters**  String,Array: The list of adapters you want to use for this message. Can be an Array like ['console','mail'], or a comma separated String like "console,mail"



## Example (js)

```js
await logger.info('Something cool');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js warn ```


The warn method that log a message with the "warn" level

## Parameters

- **message**  Mixed: The message to log

- **adapters**  String,Array: The list of adapters you want to use for this message. Can be an Array like ['console','mail'], or a comma separated String like "console,mail"



## Example (js)

```js
await logger.warn('Something cool');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js debug ```


The debug method that log a message with the "debug" level

## Parameters

- **message**  Mixed: The message to log

- **adapters**  String,Array: The list of adapters you want to use for this message. Can be an Array like ['console','mail'], or a comma separated String like "console,mail"



## Example (js)

```js
await logger.debug('Something cool');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js error ```


The error method that log a message with the "error" level

## Parameters

- **message**  Mixed: The message to log

- **adapters**  String,Array: The list of adapters you want to use for this message. Can be an Array like ['console','mail'], or a comma separated String like "console,mail"



## Example (js)

```js
await logger.error('Something cool');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _settings ```


Store this instance settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

