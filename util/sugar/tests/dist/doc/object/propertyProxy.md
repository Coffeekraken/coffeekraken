
# Function


## ```js propertyProxy ```


Create a proxy for and object property.
This gives you the possibility to process the data of the property
when it is getted or setted.

## Parameters

- **obj**  Object: The object on which to create the proxy

- **property**  String: The property name that will be proxied

- **descriptor**  Object: A descriptor object that contains at least a get or a set method, or both

- **applySetterAtStart**  Boolean: If need to apply the descriptor setter directly on the current value or not



## Example (js)

```js
import propertyProxy from '@coffeekraken/sugar/js/object/propertyProxy';
const myObject = {
		title : 'World'
};
// create the proxy
propertyProxy(myObject, 'title', {
		get : (value) => {
			return `Hello ${value}`;
		},
		set : (value) => {
			return `Youhou ${value}`;
		}
});
console.log(myObject.title) => 'Hello World';
myObject.title = 'Universe';
console.log(myObject.title) => 'Hello Youhou Universe';
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



