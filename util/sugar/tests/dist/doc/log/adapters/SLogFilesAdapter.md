
# Class


## ```js SLogFilesAdapter ```


This class allows you to log your messages, errors, etc... easily and store them in some files where you want on your file system.



## Example (js)

```js
conse SLog = require('@coffeekraken/sugar/js/log/SLog');
const SLogFilesAdapter = require('@coffeekraken/sugar/node/log/adapters/SLogFilesAdapter');
const logger = new SLog({
   adapters: [
     new SLogFilesAdapter()
   ]
});
logger.log('Something cool happend...');
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js constructor ```


Constructor

## Parameters

- **settings** ([object Object]) Object: The settings object to configure your SLogFilesAdapter instance. Here's the settings available:
- path (process.cwd() + '/.logs') {String}: Where you want to store the logs. This must be a path to a writable folder




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js log ```


This is the main method of the logger. It actually log the message passed as parameter to the confilesole

## Parameters

- **message**  Mixed: The message to log

- **level**  String: The log level. Can be "log", "info", "error", "debug" or "warn"



## Example (js)

```js
await consoleAdapter.log('hello world');
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Variables


## ```js _settings ```


Store this instance settings. Here's the list of available settings
- path (process.cwd() + '/.logs') {String}: Where you want to store the logs. This must be a path to a writable folder



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

