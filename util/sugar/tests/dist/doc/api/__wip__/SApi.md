
# Class


## ```js SApi ```


Base class that extends all the S...Api classes. This class gives some features like:
- Caching requests
- Auth support through the SAuth class
- Promise based methods like "get", "post", etc...
- And more...



## Example (js)

```js
const SApi = require('@coffeekraken/sugar/node/api/SApi');
class MyCoolApi extends SApi {
   constructor(name, settings = {}) {
     super(name, settings);
   }
}
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Methods


## ```js constructor ```


Construct the SApi instance

## Parameters

- **name**  String: The name of this SApi instance

- **settings** ([object Object]) Object: 
An object of settings to configure this SApi instance. Here's the list of available settings:
- name (SApi) {String}: Specify a name used for cache, auth, etc... This name has to stay simple and contain only these characters [a-zA-Z0-9_-+]
- baseUrl (null) {String}: The base API url to call
- cache (null) {SCache}: An SCache instance to use to save the auth infos in. If null, a default filesystem cache instance will be created
- auth (null) {SAuth}: An SAuth instance to use to get the auth infos back. If null, a default SAuth instance with a terminal adapter will be created
- defaultRequestSettings {Object}: Specify the default requests settings like cache, auth, etc...
   - cache (true) {Boolean}: Specify if you want to use cache system for this request
   - auth (true) {Boolean}: Specify if you want to use auth system for this request




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js get ```


Process to a GET request on the api wanted

## Parameters

- **path**  String: The path to make the request on

- **settings** ([object Object]) Object: An object of settings that you can pass. Check the "request" method documentation for available settings



## Example (js)

```js
const response = await myApi.get('repositories', {
   timeout: '5s'
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js post ```


Process to a POST request on the api wanted

## Parameters

- **path**  String: The path to make the request on

- **settings** ([object Object]) Object: An object of settings that you can pass. Check the "request" method documentation for available settings



## Example (js)

```js
const response = await myApi.post('repositories', {
   timeout: '5s'
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js delete ```


Process to a DELETE request on the api wanted

## Parameters

- **path**  String: The path to make the request on

- **settings** ([object Object]) Object: An object of settings that you can pass. Check the "request" method documentation for available settings



## Example (js)

```js
const response = await myApi.delete('repositories', {
   timeout: '5s'
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js head ```


Process to a HEAD request on the api wanted

## Parameters

- **path**  String: The path to make the request on

- **settings** ([object Object]) Object: An object of settings that you can pass. Check the "request" method documentation for available settings



## Example (js)

```js
const response = await myApi.head('repositories', {
   timeout: '5s'
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js options ```


Process to a OPTIONS request on the api wanted

## Parameters

- **path**  String: The path to make the request on

- **settings** ([object Object]) Object: An object of settings that you can pass. Check the "request" method documentation for available settings



## Example (js)

```js
const response = await myApi.options('repositories', {
   timeout: '5s'
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js put ```


Process to a PUT request on the api wanted

## Parameters

- **path**  String: The path to make the request on

- **settings** ([object Object]) Object: An object of settings that you can pass. Check the "request" method documentation for available settings



## Example (js)

```js
const response = await myApi.put('repositories', {
   timeout: '5s'
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js patch ```


Process to a PATCH request on the api wanted

## Parameters

- **path**  String: The path to make the request on

- **settings** ([object Object]) Object: An object of settings that you can pass. Check the "request" method documentation for available settings



## Example (js)

```js
const response = await myApi.patch('repositories', {
   timeout: '5s'
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js request ```


This method allows you to make a request to the configured API.
This try to get the response from the cache before sending the actual request to the API.
If needed, this method will ask the user for his auth informations depending on how you have
configured the settings.auth {SAuth} class.

## Parameters

- **path**  String: The path on which to make the request

- **settings** ([object Object]) Object: An object of settings that you can pass:
- cache (settings.defaultRequestSettings.cache) {Boolean}: Specify if you want to use the cache for this request or not.
- auth (settings.defaultRequestSettings.auth) {Boolean}: Specify if you want to use the auth system for this request if configured
- url (path) {String}: Specify the path on which you want to make the request
- method (get) {String}: Specify the method you want to use. Can be "get", "post", "put", "patch", "delete", "head" or "options"
- headers (null) {Object}: An object of headers to send with the request. Auth related headers are automatically added
- timeout (0) {Number|String}: Specify the number of milliseconds before the request is aborted. Can be a string like '10s', '20m', '1h', etc...
- Axios config object (null) {Object}: All the axios config parameters are available. @see https://github.com/axios/axios



## Author
- 



## ```js auth ```


Get back the auth informations that will be used by this instance



## Example (js)

```js
const auth = await myApi.auth();
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _getFromCache ```


This method check into the cache if the request uid exists

## Parameters

- **requestUid**  String: The request uid to get from cache




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _setIntoCache ```


This method save into the cache if the request response usinf the request uid as identifier

## Parameters

- **requestUid**  String: The request uid to save the response under

- **response**  Object: The response to save into cache




## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


# Variables


## ```js _name ```


Store the instance name



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



## ```js _settings ```


Store the instance settings



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

