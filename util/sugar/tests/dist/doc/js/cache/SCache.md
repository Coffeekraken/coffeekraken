


<!-- @namespace    sugar.js.cache -->

# ```js SCache ```


Gives you the ability to manage cache through some defaults available adapters or using yours.
This cache class take care of these features:
- Standard and custom TTL by cache item
- Delete cache items on expires or not



## Example (js)

```js
import SCache from '@coffeekraken/sugar/js/cache/SCache';
const cache = new SCache({
 ttl: '10s' // 10 seconds
});
cache.set('myCoolCacheItem', someData);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js constructor ```


Construct the SCache instance with the settings passed in object format. See description bellow.

## Parameters

- **settings** ([object Object]) Object: 
The settings for the SCache instance
- ttl (-1) {Number|String}: Time to live for each cache items in seconds or in String like '10s', '20h', '300ms', etc...
- deleteOnExpire (true) {Boolean}: Specify if you want that the items are deleted on expire
- adapter (fs) {String|SCacheAdapter}: Specify the adapter to use as default one. Can be a simple string like "fs" (filesystem) or an instance of an SCacheAdapter class. Here's the available ones:
   - 'fs': File system that store the items in the "temp" folder of your system
   - SCacheFsAdapter: An instance of the SCacheFsAdapter class that you can configure as you want
- parse (JSON.parse) {Function}: Specify the function used to parse the items once theirs get back from theirs save place
- stringify (JSON.stringify) {Function}: Specify the function used to stringify the item object before saving it




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js get ```


Get a value back from the cache using the specified adapter in the settings

## Parameters

- **name**  String: The name of the item to get back from the cache

- **valueOnly** (true) Boolean: Specify if you want the value only or the all cache object



## Example (js)

```js
const myValue = myCache.get('coolValue');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js set ```


Set a value to the cache system using the specified adapter with some settings like described bellow

## Parameters

- **name**  String: The name of the item to set in the cache system

- **value**  Mixed: The value to set.

- **settings** ([object Object]) Object: 
The settings for this particular item:
- ttl (-1) {Number}: Time to live in seconds
- deleteOnExpire (true) {Boolean}: Specify if this item has to be deleted on expire on not


## Example (js)

```js
const myValue = myCache.set('coolValue', { hello: 'world' }, {
   ttl: 1000
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js delete ```


Delete an item in the cache by his name

## Parameters

- **name**  String: The name of the item to delete



## Example (js)

```js
await myCache.delete('coco');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js clear ```


Delete all the items in the current cache instance



## Example (js)

```js
await myCache.clear();
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _parse ```


Take the raw value getted from the cache system and parse it to his actual object format
You can hook how this method will act by specify the "settings.parse" property to a different function

## Parameters

- **rawValue**  String: The raw value to transform into an object




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _stringify ```


Transform the passed object to a simple string in order to save it in the cache system using the specified adapter.
You can hook how this method will act by specify the "settings.stringify" property to a different function

## Parameters

- **object**  Object: The object to save to the cache system that have to transformed in string before...




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _name ```


Store the cache name



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _settings ```


Store the default settings of the SCache instance



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _defaultAdaptersPaths ```


List all the default adapters and their path



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js _adapter ```


Store this current instance adapter



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js adapter ```


Access this cache instance adapter



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

