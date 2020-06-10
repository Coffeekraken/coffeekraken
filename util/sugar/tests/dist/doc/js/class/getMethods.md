


<!-- @namespace    sugar.node.class -->

# ```js getMethods ```


This function take an instance as parameter and return all the methods in array format

## Parameters

- **instance**  Object: The instance of the object to get the methods names of



## Example (js)

```js
import getMethods from '@coffeekraken/sugar/js/class/getMethods';
myClass {
 constructor() {}
 hello() {}
 world() {}
}
const myInstance = new myClass();
getMethods(myInstance); // => ['hello','world']
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



