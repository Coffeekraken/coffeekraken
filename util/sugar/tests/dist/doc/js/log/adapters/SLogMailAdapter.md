


<!-- @namespace    sugar.js.log -->

# ```js SLogMailAdapter ```


This class allows you to log your messages, errors, etc... easily through some adapters that cover some targets like "console" of course,
"mail", "slack", etc...



## Example (js)

```js
import SLog from '@coffeekraken/sugar/js/log/SLog';
import SLogMailAdapter from '@coffeekraken/sugar/js/log/adapters/SLogMailAdapter';
const logger = new SLog({
   adapters: {
     mail: new SLogMailAdapter()
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

- **settings** ([object Object]) Object: The settings object to configure your SLogMailAdapter instance. Here's the settings available:
- host (null) {String}: Your smtp server hostname
- username (null) {String}: Your smtp username if needed
- password (null) {String}: Your smtp password if needed
- secureToken (null) {String}: An SmtpJS secure token to avoid delivering your password online
- to (null) {String}: The email address where you want to send the logs
- from (null) {String}: The email address from which you want to send the logs
- subject ('[level] sugar.js.log') {String}: The mail title. You can use the [level] placeholder to be replaced with the actual log level
- body ('[content]') {String}: The mail body. You can use the [content] placeholder to be replaced with the actual log
- metas ({}) {Object}: An object that will be transformed into a list and place inside the mail [content]




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


Store this instance settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

