
# Function


## ```js ensureExists ```


Pass a string like "my.cool.object" and the value it has to be and this function will ensure that this deep object exist

## Parameters

- **obj**  Object: The object on which to check the path existence

- **path**  String: The dotted object path to check

- **value**  Mixed: The value to set to the object path created if not already exist



## Example (js)

```js
import ensureExists from '@coffeekraken/sugar/js/object/ensureExists';
const myObj = { hello: 'world' }«
ensureExists(myObj, 'cool.object', {});
// { hello: 'world', cool: { object: {} } }
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



