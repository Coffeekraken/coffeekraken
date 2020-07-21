


<!-- @namespace    sugar.node.auth.adapters -->
<!-- @name    SAuthAdapter -->

# ```js SAuthAdapter ```


Base SAuth adapter class that has to be the base of each SAuthAdapters



## Example (js)

```js
const SAuthAdapter = require('@coffeekraken/sugar/node/auth/adapters/SAuthAdapter');
class MyCoolAdapter extends SAuthAdapter {
   construct() {
     super();
   }
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    constructor -->

# ```js constructor ```


Construct the SAuthAdapter instance




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    ask -->

# ```js ask ```


Ask form some auth informations depending on the auth type you want and the supported auth types of the selected adapter

## Parameters

- **settings** ([object Object]) Object: 
- type (settings.type) {String}: Specify the auth type you want to ask like "basic", "bearer", "oauth2", etc...
- title (null) {String}: Specify the title to display on top of the form
- error (null) {String}: An error message to display to the user. Can be something like "Your credentials have been declined. Please try again..."
- info (null) {String}: An info message to display to the user



## Example (js)

```js
const authInfos = await myAuth.ask({
   type: 'basic'
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables



<!-- @name    _supportedAuthTypes -->

# ```js _supportedAuthTypes ```


Store the supported auth types by the current auth adapter



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    supportedAuthTypes -->

# ```js supportedAuthTypes ```


Access the supported auth types for this adapter



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

