


<!-- @namespace    sugar.js.class -->
<!-- @name    methodExists -->

# ```js methodExists ```


Check if one or more methods exists on a class instance

## Parameters

- **instance**  Object: The instance to check the methods on

- **...methods**  String: The methods to check



## Example (js)

```js
class Coco {
   hello() {}
}
import methodExists from '@coffeekraken/sugar/node/class/methodExists';
const myInstance = new Coco();
methodExists(myInstance, 'hello', 'world'); // => ['world'];
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



