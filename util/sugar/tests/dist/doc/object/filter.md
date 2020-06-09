
# Function


## ```js filter ```


Allow to filter an object using a function. It works the same as the filter method on the Array object type.
The passed filter function will have as parameter each object properties and must return true or false depending if you want the
passed property in the filtered object

## Parameters

- **object**  Object: The object to filter

- **filter**  Function: The filter function that take as parameter the property itself, and the property name



## Example (js)

```js
import filter from '@coffeekraken/sugar/js/object/filter';
filter({
   coco: 'hello',
   plop: true
}, (item, name) => typeof item === 'string');
// { coco: 'hello' }
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



