


<!-- @namespace    sugar.js.config -->
<!-- @name    config -->

# ```js config ```


This class allows you to quickly access/update some configuration depending on the data adapters specified.
The base available data adapters are:
- For node:
- File system adapter: @coffeekraken/sugar/node/config/adapters/SConfigFsAdapter
- For js:
- Localstorage adapter: @coffeekraken/sugar/js/config/adapters/SConfigLsAdapter



## Example (js)

```js
import SConfig from '@coffeekraken/sugar/js/config/SConfig';
import SConfigLsAdapter from '@coffeekraken/sugar/js/config/adapters/SConfigLsAdapter';
const config = new SConfig({
  adapters: [
   new SConfigLsAdapter()
  ]
});
await config.get('log.frontend.mail.host'); // => gmail.google.com
await config.set('log.frontend.mail.host', 'mailchimp.com');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods



<!-- @name    constructor -->

# ```js constructor ```


Init the config instance by passing a name and a settings object to configure your instance

## Parameters

- **name**  String: The name of the config

- **settings** ([object Object]) Object: 
An object to configure your SConfig instance. See the list above
The available settings are:
- adapters ([]) {Array}: An array of adapters instances to use for this SConfig instance
- defaultAdapter (null) {String}: This specify which adapter you want to use as default one. If not set, take the first adapter in the adapters list
- allowSave (true) {Boolean}: Specify if this instance can save the updated configs
- allowSet (true) {Boolean}: Specify if you can change the configs during the process or not
- allowReset (true) {Boolean}: Specify if you can rest the configs during the process or not
- allowNew (false) {Boolean}: Specify you can create new configs with this instance or not
- autoLoad (true) {Boolean}: Specify if you want the config to be loaded automatically at instanciation
- autoSave (true) {Boolean}: Specify if you want the setting to be saved through the adapters directly on "set" action
- throwErrorOnUndefinedConfig (true) {Boolean}: Specify if you want the class to throw some errors when get undefined configs




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    load -->

# ```js load ```


Load the config from the default adapter or from the passed adapter

## Parameters

- **adapter** (this._settings.defaultAdapter) String: The adapter to use to load the config



## Example (js)

```js
const config = await config.load();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    save -->

# ```js save ```


Save the config through all the registered adapters or just the one specify in params

## Parameters

- **adapters** (Object.keys(this._adapters)) String,Array: The adapters to save the config through



## Example (js)

```js
await config.save();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    get -->

# ```js get ```


Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one

## Parameters

- **path**  String: The dotted object path for the value wanted

- **adapter**  String: The data adapter that you want to use to retreive this value



## Example (js)

```js
await config.get('log.frontend.mail.host'); // => gmail.google.com
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



<!-- @namespace    sugar.node.config.SConfig -->
<!-- @name    set -->

# ```js set ```


Get a config depending on the dotted object path passed and either using the first registered adapter found, or the passed one

## Parameters

- **path**  String: The dotted object path for the value wanted

- **value**  Mixed: The value to set

- **adapters** (Object.keys(this._adapters)) String,Array: The adapter you want to use or an array of adapters



## Example (js)

```js
config.set('log.frontend.mail.host', 'coffeekraken.io');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables



<!-- @name    _name -->

# ```js _name ```


The name of the config



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _adapters -->

# ```js _adapters ```


Save the registered adapters instances



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 




<!-- @name    _settings -->

# ```js _settings ```


Store the actual settings object



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

