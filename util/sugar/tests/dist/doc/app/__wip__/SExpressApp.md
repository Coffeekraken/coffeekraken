
# Class


## ```js SExpressApp ```


This class represent an express based application and gives you access to a lot of usefull routes like "/app/config/:path", "/app/meta/:path", etc...



## Example (js)

```js
const SExpressApp = require('@coffeekraken/sugar/node/class/SExpressApp');
class MyCoolApp extends SExpressApp {
   // your app class here...
}
const myApp = new MyCoolApp();
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js _registerRoutes ```


Register some usefull routes like "/app/config/:path", etc...




## Author
- 



## ```js _startExpressServer ```


Start the express http server




## Author
- 



## ```js _jsController ```


Handle the base javascript route that serve the global and common files

## Parameters

- **req**  Object: The req express object

- **res**  Object: The res express object




## Author
- 



## ```js _cssController ```


Handle the base stylesheet route that serve the global and common files

## Parameters

- **req**  Object: The req express object

- **res**  Object: The res express object




## Author
- 


# Variables


## ```js //                            _configController ```






### Author
- 



## ```js //                            _metaController ```






### Author
- 

