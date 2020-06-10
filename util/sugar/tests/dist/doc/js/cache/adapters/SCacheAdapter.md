


<!-- @namespace    sugar.js.cache.cacheAdapters -->

# ```js SCacheAdapter ```


Base class for SCache adapters



## Example (js)

```js
class SCacheCoolAdapter extends SCacheAdapter {
   constructor(settings = {}) {
     super(settings);
     // settings are accessible through this._settings
   }
   async set(name, value, settings = {}) {
     const objectToSave = this.processItem(name, value, settings);
     // make what you want with the objectToSave...
     return objectToSave; // return the objectToSave or false if something goes wrong
   }
   async get(name) {
     // make what you need to get back the cached item
     return objectOfCachedItem; // return the cached item in object format
   }
   async delete(name) {
     // make what you need to delete the cached item
     return true; // return true or false if something goes wrong
   }
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js constructor ```


Construct the SCacheAdapter instance with the settings passed in object format. See description bellow.

## Parameters

- **settings** ([object Object]) Object: An object to configure the SCacheAdapter instance. This is specific to each adapters.settings.settings...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _settings ```


Store the default settings of the SCacheAdapter instance



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

