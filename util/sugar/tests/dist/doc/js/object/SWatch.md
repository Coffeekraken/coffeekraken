


<!-- @namespace    sugar.js.object -->

# ```js SWatch ```


This class allows you to easily monitor some object properties and get the new and old value of it



## Example (js)

```js
// create the watcher instance
const watcher = new SWatch();

// object to watch
let myObject = {
		title : 'Hello World'
};

// watch the object
watcher.watch(myObject, 'title', (newVal, oldVal) => {
 	// do something when the title changes
});

// update the title
myObject.title = 'Hello Universe';
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Methods




# ```js constructor ```


Constructor




### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js watch ```


This allows you to set a watch process on one or multiple properties of the object setted in the instance.
The "globs" parameter has to be a simple glob pattern or an array of glob patterns.
The only difference with basic glob is that you can replace the "/" with "." (optional).
It uses under the hood the "glob" package that you can find here: https://www.npmjs.com/package/glob

## Parameters

- **globs**  String,Array: A glob or array of glob patterns to tell which propertie(s) you want to watch

- **handlerFn**  Function: A function that will be called with the watchObj that define the update

- **id**  String: The id you want to give to this watch process. It will be used to unwatch this process



## Example (js)

```js
myWatch.watch('*.*', {
   set: (object, prop, value) => {
     // do something
   }
});
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 





# ```js unwatch ```


Stop watching a watch process that you have created with the "watch" function

## Parameters

- **watchId**  String: The watchId to stop watching. This came as return of the "watch" method



## Example (js)

```js
const watchId = myWatch.watch('*.*', {
   // etc...
});
myWatch.unwatch(watchId);
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 


## Variables




# ```js _watchStack ```


Watch stack



### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 

