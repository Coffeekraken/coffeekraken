
# Function


## ```js toPlainObject ```


This function take a instance as parameter and return a plain object of it

## Parameters

- **instance**  Mixed: Any class instance to transform into a plain object



## Example (js)

```js
import toPlainObject from '@coffeekraken/sugar/js/class/toPlainObject';
class Coco {
   constructor() {
     this.hello = 'world';
   }
}
toPlainObject(new Coco()); // => { hello: 'world' }
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



