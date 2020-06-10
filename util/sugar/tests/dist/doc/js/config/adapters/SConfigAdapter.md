


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




# ```js constructor ```


Construct the SConfigAdapter instance with the settings passed in object format. See description bellow.

## Parameters

- **settings** ([object Object]) Object: An object to configure the SConfigAdapter instance. This is specific to each adapters.settings.settings...
- name (null) {String}: Specify a simple name for this adapter instance. This name will be used to save the configs, etc...
- ...others: All the settings you need for your specific adapter




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _settings ```


Store the default settings of the SConfigAdapter instance



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get ```js name ```


Access the adapter setted name



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# get ```js settings ```


Access the adapter setted settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

