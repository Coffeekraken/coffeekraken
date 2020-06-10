


<!-- @namespace    sugar.js.config.adapters -->

# ```js SConfigAdapter ```


Base class for SCache adapters



## Example (js)

```js
class SConfigCoolAdapter extends SConfigAdapter {
   constructor(settings = {}) {
     super(settings);
     // settings are accessible through this._settings
   }
   async load() {
     // load the config the way you want and return it in Object format
     return {};
   }
   async save(newConfig) {
     // save the newConfig object the way you want and return true when all it ok
     return true;
   }
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



## Variables


