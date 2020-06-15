


<!-- @namespace    sugar.js.object -->
<!-- @name    SWatch -->

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



## Variables


