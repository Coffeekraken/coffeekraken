
# Function


## ```js deepMap ```


This function is the same as the "map" one. The only difference is that this one goes deep into the object

## Parameters

- **object**  Object: The object you want to map through

- **processor**  Function: The processor function that take as parameter the actual property value, the current property name and the full dotted path to the current property



## Example (js)

```js
import deepMap from '@coffeekraken/sugar/js/object/deepMap';
deepMap({
   hello: 'world'
}, (value, prop, fullPath) => {
   return '~ ' + value;
});
```


## Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



