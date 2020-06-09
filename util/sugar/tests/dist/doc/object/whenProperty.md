
# Function


## ```js whenProperty ```


Resolve a promise when the wanted property on the passed object exist or pass the check function provided

## Parameters

- **object**  Object: The object on which to monitor the property

- **property**  String: The property to monitor

- **checkFn**  Function: An optional function to check the property. The promise is resolved when this function return true



## Example (js)

```js
import whenProperty from '@coffeekraken/sugar/js/object/whenProperty'

const myObj = {
 	title : 'Hello'
};

whenProperty(myObj, 'title').then((value) => {
		// the object has a title property now
});

// with a checkFn
whenProperty(myObj, 'title', (newVal, oldVal) => {
		// when the property is 'Hello World'
		return newVal === 'Hello World';
}).then((value) => {
		// do something with your Hello World
});

setTimeout(() => {
		// this will resolve the promise
		myObj.title = 'Hello World';
},1000);
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



