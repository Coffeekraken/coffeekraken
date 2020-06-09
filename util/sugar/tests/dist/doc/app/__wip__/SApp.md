
# Class


## ```js SApp ```


This class represent an application route class. This mean that you can create an application class that extend this one
and your instance will have access to a whole package of data like the application name taken from the package.json file, the version,
the description, the author(s), the contributor(s), etc...



## Example (js)

```js
const SApp = require('@coffeekraken/sugar/node/class/SApp');
class MyCoolApp extends SApp {
   // your app class here...
}
const myApp = new MyCoolApp();
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js config ```


Access the configuration of the setted adapters in "settings.config". For more informations please check the SConfig adapters documentation...

## Parameters

- **path**  String: The dotted object path of the wanted settings like "log.backend.mail.host"




## Author
- 



## ```js meta ```


Return a application meta taken from the stored datas

## Parameters

- **path**  String: The dotted object path to tell which data you want



## Example (js)

```js
sApp.meta('name'); // => @coffeekraken/sugar
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js __eatData ```


Search the setted sources to find the files like package.json, app.config.js, etc and build the __data object




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _jsContent ```


Get all the configured js files content and return it in text format




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _cssContent ```


Get all the configured js files content and return it in text format




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Variables


## ```js __settings ```






### Author
- 



## ```js __data ```






### Author
- 

