


<!-- @namespace    sugar.js.array -->

# ```js proxy ```


This function override the passed array prototype to intercept changes made through

## Parameters

- **array**  Array: The array to proxy



## Example (js)

```js
import proxy from '@coffeekraken/sugar/js/array/proxy';
const myArray = proxy([1,2,3]);
myArray.watch(['push','pop'], (watchObj) => {
   // check the watchObj action
   switch (watchObj.action) {
     case 'Array.push':
       // do something...
     break;
   }
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js watch ```


This method allows you to specify which Array methods you want to watch by passing an array of methods names like ['push','pop'].
You can also specify the handler function that will be called on each array updates, etc...

## Parameters

- **methods**  Array,String: The methods you want to watch

- **handler**  Function: The function that will be called on each updates. This function will be called with an object as parameters. Here's the list of properties available:
- method (null) {String}: The method name that causes the watch trigger
- args ([]) {Array}: An array of all the arguments passed to the method call
- oldValue (null) {Array}: The array just before the method call
- value (null) {Array}: The array after the method call
- returnedValue (null) {Mixed}: This is the value that the method call has returned


## Example (js)

```js
const watchId = myProxiedArray.watch(['push', 'pop'], (watchObj) => {
   // do something...
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js unwatch ```


This methods allows you to unwatch a process started with the "watch" method.
You have to pass as parameter the watchId that the "watch" method has returned you.

## Parameters

- **watchId**  String: The watchId returned by the "watch" method



## Example (js)

```js
const watchId = myArray.watch('push', (obj) => //...);
myArray.unwatch(watchId);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



