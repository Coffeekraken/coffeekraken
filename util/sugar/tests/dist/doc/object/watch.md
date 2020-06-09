
# Function


## ```js watch ```


This method is a simple wrapper around the SWatch class that allows you to watch some action on object and arrays

## Parameters

- **target**  Object,Array: The array or object to watch

- **globs**  String,Array: A glob or array of glob patterns to tell which propertie(s) you want to watch

- **handlerFn**  Function: A function that will be called every time an update is made on the target. This function will receive an object as parameter that describe the update



## Example (js)

```js
import watch from '@coffeekraken/sugar/js/object/watch';
let myObj = watch({
   hello: 'world'
}, '*', (event) => {
   // do something when an event appends
   console.log(event.action); // => Object.set
});
myObj.hello = 'plop';
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



