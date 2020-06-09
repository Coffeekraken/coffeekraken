
# Class


## ```js SCacheFsAdapter ```


A filesystem SCache adapter that allows you to store your cache items on the user system



## Example (js)

```js
const cache = new SCache({
   ttl: 100,
   adapter: new SCacheFsAdapter({
     path: '/my/cool/folder
   })
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js constructor ```


Construct the SCacheFsAdapter instance with the settings passed in object format. See description bellow.

## Parameters

- **settings** ([object Object]) Object: An object to configure the SCacheFsAdapter instance. This is specific to each adapters.settings.settings...




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js set ```


Set a cache item on the filesystem

## Parameters

- **name**  String: The item name

- **value**  Mixed: The value to save

- **settings** ([object Object]) Object: A settings object to override the default ones defined on the SCache instance



## Example (js)

```js
await myCache.set('myCoolItem', { hello: 'world' }, {
   ttl: 40000
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js get ```


Get a cache item on the filesystem

## Parameters

- **name**  String: The item name



## Example (js)

```js
await myCache.get('myCoolItem');
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js delete ```


Delete a cache item on the filesystem

## Parameters

- **name**  String: The item name



## Example (js)

```js
await myCache.delete('myCoolItem');
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js clear ```


Clear all the items in the current cache

## Parameters

- **cacheName**  String: The current cache name to delete



## Example (js)

```js
await myCache.clear;
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Variables


