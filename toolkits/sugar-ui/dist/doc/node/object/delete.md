


<!-- @namespace    sugar.js.object -->
<!-- @name    delete -->

# ```js delete ```


Delete an object property using a dotPath like "something.else"

## Parameters

- **object**  Object: The object on which you want to delete the property

- **dotPath**  String: The dotpath to the property you want to delete



## Example (js)

```js
import delete from '@coffeekraken/sugar/js/object/delete';
const myObject = {
   hello: 'world',
   plop: 'yop'
};
delete(myObject, 'plop');
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



