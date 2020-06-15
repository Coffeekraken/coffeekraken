


<!-- @namespace    sugar.js.object -->
<!-- @name    map -->

# ```js map ```


This is the same function as the "Array.map" but for objects. It will iterate over all the properties
of the passed object and pass the value to your process function. It will then save the property
with your processed value

## Parameters

- **object**  Object: The object to process

- **processor**  Function: The processor function that will take as parameters the current property value and the property name



## Example (js)

```js
import map from '@coffeekraken/sugar/js/object/map';
const myObject = {
   hello: 'world',
   cat: 'Nelson'
};
map(myObject, (value, prop) => {
   return prop === 'hello' ? 'universe' : value;
});
{
   hello: 'universe',
   cat: 'Nelson'
}
```


### Author
- **Olivier Bossel** <a href="mailto:olivier.bossel@gmail.com">olivier.bossel@gmail.com</a> 



