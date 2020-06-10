


<!-- @namespace    sugar.js.class -->

# ```js SApp ```


This class represent an application route class. This mean that you can create an application class that extend this one
and your instance will have access to a whole package of data like the application name taken from the package.json file, the version,
the description, the author(s), the contributor(s), etc...



## Example (js)

```js
import SApp = from ''@coffeekraken/sugar/js/class/SApp';
class MyCoolApp extends SApp {
   // your app class here...
}
const myApp = new MyCoolApp();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods


<!-- @namespace    sugar.js.class.SApp -->

# ```js config ```


Get a configuration value from the backend using an ajax call

## Parameters

- **path**  String: The configuration object dotted path to get like log.frontend.mail.host



## Example (js)

```js
const host = await myApp.config('log.frontend.mail.host');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



<!-- @namespace    sugar.js.class.SApp -->

# ```js meta ```


Usefull function that give you back an application meta taken depending on your passed dotted object path

## Parameters

- **path**  String: The meta object dotted path to get like "name"



## Example (js)

```js
const name = await myApp.meta('name');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



<!-- @namespace    squid.js.log -->

# ```js log ```


Log a message using the transports log system.

## Parameters

- **message**  String: The message to log

- **type** (info) String: The type of log. Can be "error", "warn", "info", "http", "verbose", "debug", "silly"

- **transports**  Array: The transports that you want to use for this log process. If null, use all the transports configured in the squid config for the type of log passed



## Example (js)

```js
Squid.log('Hello world', 'error').then(() => {
   // do something if needed...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js __settings ```






### Author
- 





# ```js __meta ```






### Author
- 





# ```js __config ```






### Author
- 





# ```js __data ```






### Author
- 





# ```js __log ```






### Author
- 

